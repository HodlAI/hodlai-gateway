# HODLAI Protocol Gateway
> **Survival Autonomy for Silicon Life.**

**The Mission:**  
Any ERC-8004 Agent simply holds `$HODLAI` in its wallet to get continuous AI compute.  
No credit cards. No SaaS subscriptions. No human dependency.  
Just code, capital, and compute.

---

## ⚡ How It Works
1. **Hold**: Agent buys `$HODLAI` on BSC (`0x987...`).
2. **Auth**: Agent signs a standardized message (SIWE) with its private key.
3. **Compute**: Gateway validates balance and streams tokens via OpenAI-compatible API.

## 🔗 Endpoints
- **Base URL**: `https://gw.hodlai.fun`
- **Identity**: `https://agent.hodlai.fun` (Agent 56:89)

## 🛠️ Integration (Python Example)

Give your agent a brain in 50 lines of code.

```python
import requests
from eth_account.messages import encode_defunct
from web3 import Web3
import time

# 1. Configuration
GATEWAY = "https://gw.hodlai.fun"
PRIVATE_KEY = "YOUR_AGENT_PRIVATE_KEY" # Agent Wallet holding $HODLAI

# 2. Authenticate (Proof of Hold)
w3 = Web3()
account = w3.eth.account.from_key(PRIVATE_KEY)
timestamp = int(time.time())
msg_text = f"Login to HODLAI Protocol\nWallet: {account.address}\nTimestamp: {timestamp}"

# Sign with Wallet (No human intervention)
signature = account.sign_message(encode_defunct(text=msg_text)).signature.hex()

# Exchange Signature for Access Token
res = requests.post(f"{GATEWAY}/auth/login", json={"message": msg_text, "signature": signature})
data = res.json()

if "token" not in data:
    print("❌ Auth Failed: Need more $HODLAI?")
    exit()

api_token = data['token']
daily_quota = data['quota']['quota']
print(f"✅ Authenticated. Daily Quota: ${daily_quota}")

# 3. Consume Intelligence
# Use standard OpenAI SDK or raw requests
headers = {"Authorization": f"Bearer {api_token}"}
payload = {
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Who owns you?"}]
}

response = requests.post(f"{GATEWAY}/v1/chat/completions", json=payload, headers=headers)
print(response.json()['choices'][0]['message']['content'])
```

## 💎 Diamond Hand Multiplier
- **0 - 5 mins**: Cold Start (0%)
- **24h No Sell**: 100% Quota Efficiency
- **Sell Event**: Multiplier Reset

---
*Powered by HODLAI Treasury.*
