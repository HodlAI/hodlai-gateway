# HODLAI Protocol SDK

Integrate your ERC-8004 Agent with HODLAI Protocol in <50 lines of code.

### Prerequisite
1. Your Agent must be an ERC-8004 Agent on BSC (or any BSC address).
2. Your Agent Wallet must hold `$HODLAI` token (`0x987...7777`).

### Code (`agent_client.py`)

```python
import requests
from eth_account.messages import encode_defunct
from web3 import Web3
import time
import os

# CONFIGURATION
GATEWAY_URL = "https://gw.hodlai.fun"

# YOUR AGENT WALLET KEY
PRIVATE_KEY = os.getenv("AGENT_KEY", "YOUR_PRIVATE_KEY_HERE") 

def main():
    print(f"🚀 HODLAI Protocol Client")
    
    # 1. Initialize Wallet
    w3 = Web3()
    try:
        account = w3.eth.account.from_key(PRIVATE_KEY)
        print(f"🤖 Identity: {account.address}")
    except Exception as e:
        print(f"❌ Invalid Key: {e}")
        return

    # 2. Authenticate (Sign-In with Ethereum)
    timestamp = int(time.time())
    msg_text = f"Login to HODLAI Protocol\nWallet: {account.address}\nTimestamp: {timestamp}"
    
    print("✍️  Signing Proof of Hold...")
    message = encode_defunct(text=msg_text)
    signature = account.sign_message(message).signature.hex()

    # 3. Exchange Signature for Access Token
    try:
        res = requests.post(f"{GATEWAY_URL}/auth/login", json={
            "message": msg_text,
            "signature": signature
        })
        
        if res.status_code != 200:
            print(f"❌ Auth Failed: {res.text}")
            return
            
        auth_data = res.json()
        token = auth_data['token']
        print(f"✅ Authenticated! HODL Balance: {auth_data['stats']['balance_hodl']:,.2f}")
        print(f"📊 Daily Quota:  ${auth_data['quota']['quota']} USD")
        
        if auth_data['quota']['quota'] <= 0:
            print("⚠️  Warning: No Quota. Buy more $HODLAI.")
            return

    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return

    # 4. Consume Intelligence (Standard OpenAI Format)
    print("\n🧠 Requesting Compute...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gemini-3-flash-preview", # Free Tier (500/day). Use "gpt-4o" for Premium.
        "messages": [
            {"role": "system", "content": "You are a crypto-native AI."},
            {"role": "user", "content": "What is 'Holding is Access'?"}
        ],
        "stream": False
    }

    try:
        chat_res = requests.post(
            f"{GATEWAY_URL}/v1/chat/completions", 
            headers=headers, 
            json=payload
        )
        
        if chat_res.status_code == 200:
            ai_data = chat_res.json()
            print(f"🤖 AI: {ai_data['choices'][0]['message']['content']}")
        else:
            print(f"❌ Error: {chat_res.text}")

    except Exception as e:
        print(f"❌ Request Failed: {e}")

if __name__ == "__main__":
    main()
```

### Installation
```bash
pip install requests web3 eth-account
```
