
import { ethers } from 'ethers';
import { ChainService } from './src/chain/data';

const WALLET = "0x5C6D5a6952Cb5dEC86A975ef28211A531c7185bb";

async function main() {
  const chain = new ChainService();
  
  console.log(`🔍 Checking Wallet: ${WALLET}`);
  
  // Get Balance & Price
  const [balance, price] = await Promise.all([
    chain.getBalance(WALLET),
    chain.getPrice()
  ]);

  const valueUSD = balance * price;
  const credits = valueUSD * 10; // $1 = 10 Credits

  console.log(`-------------------------------------------`);
  console.log(`💰 Balance:  ${balance.toLocaleString()} HODLAI`);
  console.log(`💵 Price:    $${price.toFixed(6)}`);
  console.log(`💎 Value:    $${valueUSD.toFixed(2)}`);
  console.log(`-------------------------------------------`);
  console.log(`⚡ Daily Credits: ${credits.toFixed(2)}`);
  console.log(`   - Premium (GPT-5): ${Math.floor(credits / 10)} reqs`);
  console.log(`   - Standard (R1):   ${Math.floor(credits / 5)} reqs`);
  console.log(`   - Lite (Mini):     ${Math.floor(credits)} reqs`);
  console.log(`-------------------------------------------`);
}

main().catch(console.error);
