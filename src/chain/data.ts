import { ethers } from 'ethers';
import axios from 'axios';

/**
 * Chain Service: The Bridge to Real World Data
 * Fetches On-Chain Balance + Off-Chain Price
 */
export class ChainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  
  // HODLAI (BSC)
  private readonly TOKEN_ADDRESS = '0x987E6269c6B7eA6898221882f11EA16F87B97777';
  private readonly PAIR_ADDRESS = '0x233BE6ff451C87D3bde3bAb2A8c0c0CdF872003c';

  constructor() {
    // Robust RPC (Paid/Private Node to avoid Rate Limits)
    this.provider = new ethers.JsonRpcProvider('https://lb.drpc.live/bsc/At_J2_4UBE0DvXufYTxkBabn_V3jAnoR8IDofhHoK236');
    
    // ABI: Essential functions only
    const abi = [
      'function balanceOf(address) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'event Transfer(address indexed from, address indexed to, uint256 value)'
    ];
    this.contract = new ethers.Contract(this.TOKEN_ADDRESS, abi, this.provider);
  }

  /**
   * Get HODL Balance (Formatted Number)
   */
  async getBalance(wallet: string): Promise<number> {
    try {
      const [rawBal, decimals] = await Promise.all([
        this.contract.balanceOf(wallet),
        this.contract.decimals()
      ]);
      
      return parseFloat(ethers.formatUnits(rawBal, decimals));
    } catch (e) {
      console.error('[Chain] Balance fetch failed:', e);
      return 0; // Fail safe
    }
  }

  /**
   * Get Real-time Price (USD) from DexScreener
   * Why API? Faster/Cheaper than on-chain Oracle for memecoins.
   */
  async getPrice(): Promise<number> {
    try {
      const url = `https://api.dexscreener.com/latest/dex/pairs/bsc/${this.PAIR_ADDRESS}`;
      const config = { timeout: 5000 }; // 5s timeout
      
      const res = await axios.get(url, config);
      const price = res.data?.pair?.priceUsd;
      
      return price ? parseFloat(price) : 0.003; // Fallback to last known safe price
    } catch (e) {
      console.warn('[Chain] Price fetch failed, using fallback');
      return 0.003;
    }
  }

  /**
   * Get Last Outgoing Transfer Time (Diamond Hand Check)
   * Optimization: We only scan the last 24 hours (approx 28,800 blocks).
   * If found: User moved tokens recently -> Low multiplier.
   * If NOT found: User held > 24h -> Max multiplier.
   */
  async getLastTransferTime(wallet: string): Promise<number> {
    try {
      const provider = this.provider;
      const currentBlock = await provider.getBlockNumber();
      // Optimization: Using Paid RPC, we can scan the full 24h range safely.
      const blocksPerDay = 28800; // ~3s per block on BSC
      const fromBlock = currentBlock - blocksPerDay;

      // Filter: Transfer(from, to, value)
      // We only care if 'from' == wallet (Outgoing)
      const filter = this.contract.filters.Transfer(wallet, null, null);
      
      const logs = await this.contract.queryFilter(filter, fromBlock, currentBlock);

      if (logs.length > 0) {
        // Found outgoing transfers. Get the latest one.
        const lastLog = logs[logs.length - 1];
        const block = await provider.getBlock(lastLog.blockNumber);
        return block ? block.timestamp : Math.floor(Date.now() / 1000);
      }

      // No transfers in last 24h -> Return timestamp > 24h ago
      return Math.floor(Date.now() / 1000) - 86401;

    } catch (e) {
      console.warn('[Chain] Log scan failed, defaulting to Diamond Hand', e);
      return Math.floor(Date.now() / 1000) - 86401; 
    }
  }
}
