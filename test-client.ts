import { ethers } from 'ethers';

const GATEWAY_URL = "http://localhost:3001"; // Test local first
const KEY = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; // Dummy Key
const WALLET_ADDR = new ethers.Wallet(KEY).address; 

// Note: I hardcoded this wallet in data.ts to return balance 10,000,000 for testing
console.log("🤖 Tester Identity:", WALLET_ADDR);

async function run() {
  // 1. SIWE
  const wallet = new ethers.Wallet(KEY);
  const timestamp = Math.floor(Date.now() / 1000);
  const msgText = `Login to HODLAI Protocol\nWallet: ${WALLET_ADDR}\nTimestamp: ${timestamp}`;
  const signature = await wallet.signMessage(msgText);

  console.log("🔐 Logging in...");
  const authRes = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ message: msgText, signature })
  });
  
  const authData = await authRes.json();
  if (!authRes.ok) throw new Error(JSON.stringify(authData));
  
  console.log("✅ Logged In.");
  console.log("💰 Balance:", authData.stats.balance_hodl);
  console.log("🎫 Token:", authData.token.substring(0, 10) + "...");

  // 2. Chat
  console.log("🧠 Requesting Compute (via Upstream)...");
  const chatRes = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authData.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      stream: false, // Force non-streaming for simple JSON test
      messages: [{ role: "user", content: "Say HODL" }]
    })
  });

  const text = await chatRes.text();
  console.log("📥 Raw Response:", text);
  
  try {
    const chatData = JSON.parse(text);
    if (!chatRes.ok) throw new Error(JSON.stringify(chatData));
    console.log("🤖 AI Reply:", chatData.choices?.[0]?.message?.content);
  } catch(e) {
    console.log("⚠️ Parse Error (Maybe Stream?):", e.message);
  }
}

run().catch(console.error);
