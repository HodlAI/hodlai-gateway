import { ethers } from 'ethers';

/**
 * Chain Service for Web4AI/Automaton Agents
 * Validates on-chain identity and token holdings
 */
export class ChainService {
  private provider: ethers.JsonRpcProvider;
  
  // Hardcoded RPC fallback
  private readonly RPC_URL = process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org';
  
  // NOTE: Awaiting real WEB4AI contract address deployment. 
  private readonly TOKEN_ADDRESS = '0xdd0993227bd89c9261eb05b1cb78d58af1ca7777'; 

  constructor() {
    this.provider = new ethers.JsonRpcProvider(this.RPC_URL);
  }

  /**
   * Return contract with a new provider to avoid connection death
   */
  private getContract(): ethers.Contract {
      // ABI: Essential functions only + ERC20 extended tracking if ever added
      const abi = [
        'function balanceOf(address) view returns (uint256)',
        'function decimals() view returns (uint8)'
      ];
      return new ethers.Contract(this.TOKEN_ADDRESS, abi, this.provider);
  }

  /**
   * Get Web4AI Holding Balance
   */
  async getBalance(wallet: string): Promise<number> {
    try {
      const contract = this.getContract();
      const rawBal = await contract.balanceOf(wallet);
      const decimals = await contract.decimals();
      
      return parseFloat(ethers.formatUnits(rawBal, decimals));
    } catch (e) {
      console.error('[Chain] Balance fetch failed:', e);
      return 0; // Better to deny access than allow free on error
    }
  }

  /**
   * Stub for token hold time (Block/Timestamp mapping)
   * This is challenging to perfectly track without a subgraph or dedicated on-chain mapping 
   * (Standard ERC20 doesn't track "when did they last buy"). 
   * For the Gateway proxy we return 24 hours (Full Quota) until an indexer is added.
   * If token is transferred away, the gateway drops their quota size on next poll.
   */
  async getHoldTimeHours(wallet: string): Promise<number> {
    return 24; // Default full maturation
  }

  /**
   * Fetch current value of $WEB4AI token
   */
  async getPrice(): Promise<number> {
    try {
      // Stub: Should hit DexScreener/Pancake oracle. 
      // Hardcoded stub for gateway testing.
      return parseFloat(process.env.WEB4AI_PRICE_USD || '0.005');
    } catch (e) {
      console.error('[Chain] Price Oracle Failed:', e);
      return 0.005; // Fallback
    }
  }
}
