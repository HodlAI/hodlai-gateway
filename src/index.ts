import 'dotenv/config'; // Load env first
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { AuthValidator } from './auth/siwe'; 
import { ChainService } from './chain/data'; // Import Chain Reader
import { QuotaManager } from './core/quota';
import { QuotaService } from './core/state';
import { CostCalculator } from './metering/pricing';
import { TokenCounter } from './metering/counter';
import { stream } from 'hono/streaming';

const app = new Hono();
const state = new QuotaService();
const chain = new ChainService(); // Initialize Chain Connection
const JWT_SECRET = process.env.JWT_SECRET || 'hodlai-dev-secret-do-not-use-in-prod';

// Status Check
app.get('/', (c) => c.json({ status: 'ok', service: 'HodlAI Gateway', version: '1.0.0' }));

// 1. Auth Endpoint: Swap Signature for Session Token & Snapshot Quota
app.post('/auth/login', async (c) => {
  const { message, signature } = await c.req.json();
  
  // A. Verify Identity (SIWE)
  const wallet = await AuthValidator.verify(message, signature);
  if (!wallet) return c.json({ error: 'Invalid Signature' }, 401);

  // B. Sync with Blockchain (Snapshot)
  const [balance, price, lastTransfer] = await Promise.all([
    chain.getBalance(wallet),
    chain.getPrice(),
    chain.getLastTransferTime(wallet)
  ]);

  // C. Calculate Entitlement
  const entitlement = QuotaManager.calculate(balance, price, lastTransfer);
  
  // D. Update Redis State
  // We refresh the user's daily bucket based on current holding
  // Optimization: Only reset if it's a new day or balance increased? 
  // For MVP: Always refresh quota to current calculated value.
  await state.refreshQuota(wallet, entitlement.quota);

  console.log(`[Auth] User ${wallet} logged in. Balance: ${balance} ($${(balance*price).toFixed(2)}). Quota: ${entitlement.quota} Credits`);

  // E. Issue Session Token
  const token = await sign({ sub: wallet, exp: Math.floor(Date.now() / 1000) + 86400 }, JWT_SECRET);
  
  return c.json({ 
    token, 
    wallet, 
    quota: entitlement,
    stats: { balance_hodl: balance, price_usd: price }
  });
});

// Middleware: The "Asset-as-a-Service" Logic
app.use('/v1/*', async (c, next) => {
  // 1. Auth: Verify JWT
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Missing Auth' }, 401);
  
  const token = authHeader.split(' ')[1];
  let payload;
  try {
    payload = await verify(token, JWT_SECRET, "HS256");
  } catch (e) {
    console.error('[Auth] Token Verification Failed:', e);
    return c.json({ error: 'Invalid or Expired Token' }, 401);
  }
  
  const walletAddress = payload.sub as string;
  c.set('wallet', walletAddress);

  // 2. High-Speed Quota Check (Redis Only)
  // We do NOT call Blockchain here to ensure <50ms latency
  const balance = await state.getBalance(walletAddress);
  
  if (balance <= 0) {
    return c.json({ error: 'Payment Required: Quota Depleted. Top up HODLAI and Re-login.', balance }, 402);
  }
  
  await next();
});

// Models List Proxy (Transparent Forward)
app.get('/v1/models', async (c) => {
  const upstreamBase = process.env.UPSTREAM_URL || 'http://localhost:4000';
  const apiKey = process.env.UPSTREAM_KEY;

  if (!apiKey) return c.json({ error: 'Gateway Config Error' }, 500);

  try {
    const targetUrl = upstreamBase.replace(/\/$/, '') + '/v1/models';
    const upstreamRes = await fetch(targetUrl, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    // Transparent Pipe
    const newHeaders = new Headers(upstreamRes.headers);
    newHeaders.delete('content-encoding');
    return new Response(upstreamRes.body, { status: upstreamRes.status, headers: newHeaders });
  } catch (e: any) {
    return c.json({ error: 'Upstream Error', msg: e.message }, 500);
  }
});

// Fixed Pricing Table (Credits per Request)
// Strategy: 
// Premium & Smart (10 Credits): GPT-4o, Claude 3/3.7, O-Series, Gemini Pro, Qwen Max
// Standard (5 Credits): GPT-4, Llama 405b
// Lite & Fast (1 Credit): GPT-3.5/4o-mini, Gemini Flash, DeepSeek-V3, Qwen Turbo, Haiku
// Tiny & Free-ish (0.1 Credit): 7B/8B Models
const PRICING_RULES: Array<{ pattern: RegExp, cost: number }> = [
  // --- Tier 1: Premium Intelligence (10 Credit per request) ---
  { pattern: /^(gpt-4o|claude-3-5-sonnet|claude-3-7|gemini-1.5-pro|gemini-3-pro|o1-|o3-|qwen-max|grok-3).*/, cost: 10 },
  { pattern: /^(gpt-5|claude-opus|deepseek-r1).*/, cost: 10 },
  
  // --- Tier 2: Standard (5 Credits per request) ---
  { pattern: /^(gpt-4-turbo|llama-3\.1-405b|sonar-pro).*/, cost: 5 },

  // --- Tier 3: Efficiency (1 Credit per request) ---
  { pattern: /^(gpt-4o-mini|gpt-3\.5|claude-3-haiku|gemini-.*flash|deepseek-chat|deepseek-v3|qwen-plus|qwen-turbo|llama-3\.[1-3]-70b).*/, cost: 1 },
  
  // --- Tier 4: Micro/Tiny (0.1 Credit per request) ---
  { pattern: /.*(8b|7b|1b|3b|nano|micro).*/, cost: 0.1 },
];

const DEFAULT_COST = 10; // Fallback to premium if unknown

function getCost(model: string): number {
  for (const rule of PRICING_RULES) {
    if (rule.pattern.test(model)) {
      return rule.cost;
    }
  }
  return DEFAULT_COST;
}

// Chat Completions Proxy
app.post('/v1/chat/completions', async (c) => {
  const body = await c.req.json();
  const model = body.model || 'gpt-4o';
  
  // 1. Calculate Cost (Per Request)
  const cost = getCost(model);

  // 2. Pre-flight Check (Double check balance to prevent negative)
  const wallet = c.get('wallet') as string;
  const currentBal = await state.getBalance(wallet);
  if (currentBal < cost) {
     return c.json({ error: { message: `Insufficient Quota. Required: ${cost} Credits, Available: ${currentBal} Credits. Hold more HODLAI.` } }, 402);
  }

  // 3. Proxy to Upstream
  const upstreamBase = process.env.UPSTREAM_URL || 'http://localhost:4000';
  const apiKey = process.env.UPSTREAM_KEY;

  if (!apiKey) return c.json({ error: 'Gateway Config Error: No Upstream Key' }, 500);

  try {
    const targetUrl = upstreamBase.replace(/\/$/, '') + '/v1/chat/completions';

    const upstreamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!upstreamRes.ok) {
      const err = await upstreamRes.text();
      return c.json({ error: 'Upstream Error', details: err }, upstreamRes.status);
    }

    // 4. Billing (Deduct Fixed Cost)
    await state.deduct(wallet, cost);
    console.log(`[Billing] Request: ${model} | Cost: ${cost} Credits | User: ${wallet}`);

    // 5. Pipe Response
    const newHeaders = new Headers(upstreamRes.headers);
    newHeaders.delete('content-encoding');

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      headers: newHeaders
    });

  } catch (e: any) {
    return c.json({ error: 'Gateway Exception', msg: e.message }, 500);
  }
});

const port = Number(process.env.PORT) || 3001;
console.log(`[Gateway] Starting on port ${port}...`);

serve({
  fetch: app.fetch,
  port
});

export default app;