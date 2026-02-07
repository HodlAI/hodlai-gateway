# HodlAI API Gateway Integration

Welcome to the **HodlAI API Gateway**. This service acts as the "utility layer" for the HodlAI network, converting on-chain holdings ($HODLAI) into off-chain compute credits (API Quota).

It exposes an **OpenAI-compatible API** (`/v1/chat/completions`) protected by **SIWE (Sign-In with Ethereum)** authentication.

---

## 🚀 Quick Start for Agents

To use HodlAI models in your agent, you must first authenticate (exchange a wallet signature for a session token) and then call the API.

### Endpoint Base URL
`https://gw.hodlai.fun` (or `http://localhost:3001` if running locally)

---

### Step 1: Authentication (Login)

You need to prove ownership of a wallet holding $HODLAI.

**Endpoint**: `POST /auth/login`

**Request**:
```json
{
  "message": "<SIWE Message String>",
  "signature": "<Wallet Signature>"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOi...",  // <--- Your Session Token (Bearer Token)
  "quota": {
    "quota": 500,           // Your daily credit limit
    "tier": "Standard"
  }
}
```

> **Note**: The token expires in 24 hours. You must re-login daily to refresh your quota snapshot.

### Step 2: Call the API (OpenAI Compatible)

Use the standard OpenAI SDK or simple HTTP requests.

**Endpoint**: `POST /v1/chat/completions`
**Headers**:
- `Authorization`: `Bearer <Your_Session_Token>`
- `Content-Type`: `application/json`

**Request**:
```json
{
  "model": "claude-opus-4-6",
  "messages": [{"role": "user", "content": "Hello!"}],
  "temperature": 0.7
}
```

---

## 📦 TypeScript / Node.js Example

Here is a complete, copy-paste helper class to integrate HodlAI Gateway into your TypeScript agent.

1. Install dependencies:
   `npm install siwe ethers axios`

2. Use this code:

```typescript
import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';
import axios from 'axios';

export class HodlAIClient {
  private token: string | null = null;
  private gatewayUrl = "https://gw.hodlai.fun";

  constructor(private privateKey: string) {}

  /**
   * 1. Login to Gateway to get Session Token
   */
  async login() {
    const wallet = new ethers.Wallet(this.privateKey);
    const domain = "hodlai.fun";
    const origin = "https://hodlai.fun";
    
    // Create SIWE Message
    const message = new SiweMessage({
      domain,
      address: wallet.address,
      statement: "Sign in to HodlAI Gateway to access Intelligence API.",
      uri: origin,
      version: '1',
      chainId: 56 // BSC Mainnet
    });

    const messageText = message.prepareMessage();
    const signature = await wallet.signMessage(messageText);

    // Exchange for Token
    const res = await axios.post(`${this.gatewayUrl}/auth/login`, {
      message: messageText,
      signature
    });

    this.token = res.data.token;
    console.log(`✅ Logged in! Quota: ${res.data.quota.quota} Credits`);
    return this.token;
  }

  /**
   * 2. Call Chat Completion
   */
  async chat(prompt: string, model = "claude-3-5-sonnet") {
    if (!this.token) await this.login();

    try {
      const res = await axios.post(
        `${this.gatewayUrl}/v1/chat/completions`,
        {
          model,
          messages: [{ role: "user", content: prompt }]
        },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response?.status === 401) {
        console.log("Token expired, re-logging in...");
        await this.login();
        return this.chat(prompt, model); // Retry
      }
      throw e;
    }
  }
}

// Usage
// const client = new HodlAIClient("YOUR_PRIVATE_KEY");
// const response = await client.chat("Explain quantum physics");
// console.log(response.choices[0].message.content);
```

---

## 💰 Cost Model

Requests consume "Credits" from your daily quota. Quota is determined by your on-chain $HODLAI holdings at the time of login.

| Model Tier | Cost (Credits/Req) | Models Example |
| :--- | :--- | :--- |
| **Premium** | 10 | `claude-opus-4-6`, `gpt-4o`, `deepseek-r1` |
| **Standard** | 5 | `gpt-4-turbo`, `llama-405b` |
| **Efficiency** | 1 | `gpt-4o-mini`, `claude-haiku`, `gemini-flash` |
| **Free** | 0 | `gemini-3-flash-preview` |

*Note: Pricing is per-request in the MVP, regardless of token length (fair use applies).*

---

## 🛠️ Self-Hosting (Optional)

If you want to run your own Gateway:

1. Clone repo: `git clone https://github.com/HodlAI/hodlai-gateway`
2. Install: `npm install`
3. Config `.env`:
   ```bash
   PORT=3001
   JWT_SECRET=your-secret
   UPSTREAM_URL=https://api.openai.com # or standard provider
   UPSTREAM_KEY=sk-...
   Redis/RPC configs...
   ```
4. Run: `npm run start`

---

**HodlAI Network**
*Infrastructure for the Silicon Age.*
