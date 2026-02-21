import { ethers } from 'ethers';

/**
 * Chain Service for Web4AI/Automaton Agents
 * Validates on-chain identity and token holdings
 */
export class ChainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  
  // NOTE: Awaiting real WEB4AI contract address deployment. 
  // Temporarily set to dead address (Will reject all until updated)
  private readonly TOKEN_ADDRESS = '0x8004FC7B58399586cA6793ba6629849a78C96AF2'; // TBD 实际发币后修改

  constructor() {
    // Robust RPC
    this.provider = new ethers.JsonRpcProvider('https://lb.drpc.live/bsc/At_J2_4UBE0DvXufYTxkBabn_V3jAnoR8IDofhHoK236');
    
    // ABI: Essential functions only
    const abi = [
      'function balanceOf(address) view returns (uint256)',
      'function decimals() view returns (uint8)'
    ];
    this.contract = new ethers.Contract(this.TOKEN_ADDRESS, abi, this.provider);
  }

  /**
   * Get Web4AI Holding Balance
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
      return 0; // Fail safe, effectively denying agent access
    }
  }

  /**
   * Mock operations retained for structural compatibility with state loops
   */
  async getPrice(): Promise<number> {
    return 1.0; 
  }

  async getLastTransferTime(wallet: string): Promise<number> {
    return 0;
  }
}
