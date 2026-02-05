import requests
from eth_account.messages import encode_defunct
from web3 import Web3
import time
import json
import os

# ------------------------------------------------------------------
# HODLAI AGENT SDK - REFERENCE IMPLEMENTATION
# "Holding is Access"
# ------------------------------------------------------------------

# CONFIGURATION
GATEWAY_URL = "https://gw.hodlai.fun" # Production Gateway
# GATEWAY_URL = "http://localhost:3001" # Local Dev

# YOUR AGENT WALLET (Must Hold HODLAI Token on BSC)
# WARNING: NEVER Commit Real Keys to Repo! Use Env Vals.
PRIVATE_KEY = os.getenv("AGENT_KEY", "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef") 

def main():
    print(f"🚀 HODLAI Protocol Client | Gateway: {GATEWAY_URL}")
    
    # 1. Initialize Wallet
    w3 = Web3()
    try:
        account = w3.eth.account.from_key(PRIVATE_KEY)
        print(f"🤖 Agent Identity: {account.address}")
    except Exception as e:
        print(f"❌ Invalid Key: {e}")
        return

    # 2. Authenticate (Sign-In with Ethereum)
    # Message must verify ownership of the wallet
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
            print(f"❌ Auth Failed [{res.status_code}]: {res.text}")
            return
            
        auth_data = res.json()
        token = auth_data['token']
        print(f"✅ Authenticated!")
        print(f"💰 HODL Balance: {auth_data['stats']['balance_hodl']:,.2f}")
        print(f"📊 Daily Quota:  ${auth_data['quota']['quota']} USD")
        
        if auth_data['quota']['quota'] <= 0:
            print("⚠️  Warning: No Quota. Buy more $HODLAI to get compute.")
            return

    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return

    # 4. Consume Intelligence (OpenAI Compatible)
    print("\n🧠 Requesting Compute...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gpt-4o", # Or "gpt-3.5-turbo", "deepseek-chat"
        "messages": [
            {"role": "system", "content": "You are a crypto-native AI."},
            {"role": "user", "content": "What is the meaning of HODL?"}
        ],
        "stream": False
    }

    try:
        t0 = time.time()
        chat_res = requests.post(
            f"{GATEWAY_URL}/v1/chat/completions", 
            headers=headers, 
            json=payload
        )
        
        latency = (time.time() - t0) * 1000
        
        if chat_res.status_code == 200:
            ai_data = chat_res.json()
            reply = ai_data['choices'][0]['message']['content']
            print(f"🤖 AI Response ({int(latency)}ms):")
            print("-" * 40)
            print(reply)
            print("-" * 40)
        else:
            print(f"❌ API Error [{chat_res.status_code}]: {chat_res.text}")

    except Exception as e:
        print(f"❌ Request Failed: {e}")

if __name__ == "__main__":
    main()
