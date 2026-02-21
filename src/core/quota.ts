import { ethers } from 'ethers';

/**
 * QuotaManager: The Economic Brain of HODLAI Gateway 
 * Evaluates Agent Token Ownership ($10 Held = $1.5 Daily Survival Credits)
 */
export class QuotaManager {
  // Constant: $10 Held = $1.5 Daily Limit 
  private static readonly YIELD_RATIO = 0.15; 

  /**
   * Value Rating System for WEB4AI/Automaton Agents
   * @param balanceTokens - Amount of WEB4AI tokens held
   * @param tokenPriceUsd - Current price of WEB4AI in USD
   */
  static calculateAgentQuota(balanceTokens: number, tokenPriceUsd: number): { quota: number, multiplier: number, reason: string } {
      if (balanceTokens <= 0 || tokenPriceUsd <= 0) {
         return { quota: 0, multiplier: 0, reason: "No Tokens or Zero Value" };
      }
      
      const holdingValueUsd = balanceTokens * tokenPriceUsd;
      const dailyQuota = holdingValueUsd * this.YIELD_RATIO;
      
      return {
          quota: parseFloat(dailyQuota.toFixed(4)),
          multiplier: 1.0,
          reason: `Agent Active ($10=$1.5, Held: $${holdingValueUsd.toFixed(2)})`
      };
  }
}
