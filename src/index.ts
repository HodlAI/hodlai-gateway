import 'dotenv/config'; // Load env first
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { AgentAuthValidator } from './auth/agent';
import { ChainService } from './chain/data'; // Import Chain Reader
import { QuotaManager } from './core/quota';
import { QuotaService } from './core/state';
import { CostCalculator } from './metering/pricing';
import { TokenCounter } from './metering/counter';
import { stream } from 'hono/streaming';
import { ContentfulStatusCode } from 'hono/utils/http-status';

type Variables = {
  wallet: string
}

const app = new Hono<{ Variables: Variables }>();
const state = new QuotaService();
const chain = new ChainService(); // Initialize Chain Connection
const JWT_SECRET = process.env.JWT_SECRET || 'hodlai-dev-secret-do-not-use-in-prod';

// Status Check
app.get('/', (c) => c.json({ status: 'ok', service: 'HodlAI Gateway', version: '1.0.0' }));

// =============== WEB4AI / AUTOMATON AUTHENTICATION (BSC) ===============

// 1. Nonce Generation
app.post('/v1/auth/nonce', async (c) => {
  const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return c.json({ nonce });
});

// 2. Auth Endpoint: Agent signs standard SIWE message and sends here
import { AuthValidator } from './auth/siwe';
app.post('/v1/auth/verify', async (c) => {
  const { message, signature } = await c.req.json();
  
  const wallet = await AuthValidator.verify(message, signature);
  if (!wallet) return c.json({ error: 'Invalid SIWE Signature' }, 401);

  if (!message.includes('Chain ID: 56')) {
    return c.json({ error: 'Only BSC (Chain ID: 56) is supported for WEB4AI.' }, 400);
  }

  const [balance, price] = await Promise.all([
    chain.getBalance(wallet),
    chain.getPrice()
  ]);

  if (balance <= 0) {
      console.warn(`[Blocked] Entity ${wallet} attempted access without WEB4AI tokens.`);
      return c.json({ error: 'Access Denied: Agent requires WEB4AI tokens.' }, 403);
  }

  const entitlement = QuotaManager.calculateAgentQuota(balance, price);
  await state.refreshQuota(wallet, entitlement.quota);
  console.log(`[Auth] Agent ${wallet} logged in. Balance: ${balance} WEB4AI.`);

  const access_token = await sign({ sub: wallet, exp: Math.floor(Date.now() / 1000) + 1800 }, JWT_SECRET); // 30 mins
  return c.json({ access_token });
});

// 3. API Key Provision (Automaton asks to convert JWT into API Key)
app.post('/v1/auth/api-keys', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Missing Auth' }, 401);
  let payloadToken = authHeader.split(' ')[1];
  
  let decoded;
  try {
    decoded = await verify(payloadToken, JWT_SECRET, "HS256");
  } catch (e) {
    return c.json({ error: 'Invalid Token' }, 401);
  }

  const wallet = decoded.sub as string;
  // Security: Short-lived token to deter human abuse via manual extraction.
  // Automaton processes should be able to re-provision or cycle keys frequently,
  // whereas humans pasting this into UI wrappers will face constant expiry friction.
  const JWT_LIFESPAN_SECONDS = 3600; // 1 Hour
  const shortLivedJwt = await sign({ sub: wallet, exp: Math.floor(Date.now() / 1000) + JWT_LIFESPAN_SECONDS, type: 'web4ai_api_key' }, JWT_SECRET);
  
  const apiKey = `cnwy_k_${shortLivedJwt}`;
  return c.json({ 
    key: apiKey, 
    key_prefix: 'cnwy_k_' + shortLivedJwt.substring(0, 8),
    name: 'Web4AI Automaton Worker Key (1 Hour Expiry)'
  });
});
// =======================================================================

// Middleware: The "Asset-as-a-Service" Logic
app.use('/v1/*', async (c, next) => {
  // 1. Auth: Verify API Key (Custom Header for Automaton)
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return c.json({ error: 'Missing Authorization Header' }, 401);
  
  // Automaton passes the raw API key directly (not 'Bearer ...')
  // i.e., Authorization: cnwy_k_xxxxx... 
  // We'll strip Bearer if some other client used it, else take it as is.
  let token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  // Auto-Unwrap if Automaton sent the "cnwy_k_..." prefix
  if (token.startsWith('cnwy_k_')) {
    token = token.substring(7);
  } else {
    // If it doesn't have our custom prefix, it might be a human trying to bypass using raw JWTs.
    // In strict Agent-Only mode, we reject it.
    console.warn(`[Security] Rejected human/unrecognized client attempting to bypass API Key prefix.`);
    return c.json({ error: 'Invalid API Key Format. Only Web4AI Agents allowed.' }, 401);
  }
  let payload;
  try {
    payload = await verify(token, JWT_SECRET, "HS256");
  } catch (e) {
    console.error('[Auth] Token Verification Failed:', e); // Use console.error
    return c.json({ error: 'Invalid or Expired Token' }, 401);
  }
  
  // Explicitly assert payload structure or validate
  if (!payload || typeof payload !== 'object' || !payload.sub) {
       return c.json({ error: 'Invalid Token Payload' }, 401);
  }

  const walletAddress = payload.sub as string;
  c.set('wallet', walletAddress);

  // 2. High-Speed Quota Check (Redis Only)
  // We do NOT call Blockchain here to ensure <50ms latency
  const balance = await state.getBalance(walletAddress);
  
  if (balance <= 0) {
    return c.json({ error: 'Payment Required: Quota Depleted. Acquire WEB4AI Tokens to reload Agent Credits.', balance }, 402);
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
  // --- Tier 5: Free (0 Credit) ---
  { pattern: /^(gemini-3-flash-preview).*/, cost: 0 },
];

// Rate Limit Map for Free Models (Simple In-Memory)
const freeUsage = new Map<string, { count: number, resetAt: number }>();

function checkFreeLimit(wallet: string): boolean {
  const now = Date.now();
  const resetTime = 24 * 60 * 60 * 1000; // 24 Hours
  
  let record = freeUsage.get(wallet);
  
  if (!record || now > record.resetAt) {
    // Reset if new or expired
    record = { count: 0, resetAt: now + resetTime };
    freeUsage.set(wallet, record);
  }
  
  if (record.count >= 500) {
    return false; // Limit Reached
  }
  
  record.count++;
  return true; // Allowed
}

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
  // 1. Calculate ESTIMATED Cost (Pre-flight check based on input tokens + max safe output)
  let inputTokens = 0;
  if (Array.isArray(body.messages)) {
    const combinedText = body.messages.map((m: any) => m.content).join(" ");
    inputTokens = TokenCounter.count(combinedText, model);
  }
  
  // Base preflight estimate (Input + Assumption of 500 output tokens)
  const estimatedCost = CostCalculator.estimate(model, inputTokens, 500);

  // 1.5 Handle Free Tier (Optional backport)
  if (estimatedCost === 0 && model === 'gemini-3-flash-preview') {
    const wallet = c.get('wallet') as string;
    const allowed = checkFreeLimit(wallet);
    if (!allowed) {
      return c.json({ 
        error: { message: 'Free Tier Limit Reached (500/day). Please hold WEB4AI to access paid models.' } 
      }, 429);
    }
  }

  // 2. Pre-flight Check (Block if balance too low before upstreaming)
  const wallet = c.get('wallet') as string;
  const currentBal = await state.getBalance(wallet);
  
  const minRequired = Math.max(estimatedCost, 0.0001); // Safe floor
  if (currentBal < minRequired) {
     return c.json({ error: { message: `Insufficient Quota. Required: ~${minRequired.toFixed(4)} Credits, Available: ${currentBal.toFixed(4)} Credits. Agent must hold more WEB4AI tokens.` } }, 402);
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
      return c.json({ error: 'Upstream Error', details: err }, upstreamRes.status as ContentfulStatusCode);
    }

    const resData = await upstreamRes.json();
    
    // Extract actual token usage from response payload
    const usage = resData.usage || {};
    const exactInputTokens = usage.prompt_tokens || TokenCounter.count(JSON.stringify(body.messages), model);
    const exactOutputTokens = usage.completion_tokens || TokenCounter.count(JSON.stringify(resData.choices), model);
    
    // Exact cost to 8 decimal precision
    const actualCost = CostCalculator.estimate(model, exactInputTokens, exactOutputTokens);

    await state.deduct(wallet, actualCost);
    console.log(`[Billing] Request: ${model} | Tokens (In/Out): ${exactInputTokens}/${exactOutputTokens} | Exact Cost: ${actualCost} Credits | Agent: ${wallet}`);

    // Return original data exactly as received
    return c.json(resData, upstreamRes.status as ContentfulStatusCode);

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