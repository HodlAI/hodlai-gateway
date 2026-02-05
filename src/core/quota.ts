import { ethers } from 'ethers';

/**
 * QuotaManager: The Economic Brain of HODLAI
 * Calculates daily API limits based on Token Holdings & Diamond Hand status.
 */
export class QuotaManager {
  // Constant: $10 Held = $1 Daily Limit (10% Daily Yield in Compute)
  private static readonly YIELD_RATIO = 0.10; 

  /**
   * Calculate User's Daily Quota (USD)
   * @param balanceHODL - Amount of tokens held (e.g. 10000.0)
   * @param priceUSD - Current price of HODLAI (e.g. 0.004)
   * @param lastTransferIn - Timestamp (seconds) of last buy/transfer-in
   */
  static calculate(balanceHODL: number, priceUSD: number, lastTransferIn: number): { quota: number, multiplier: number, reason: string } {
    const now = Math.floor(Date.now() / 1000);
    const holdingDuration = now - lastTransferIn; // in seconds
    const minutesHeld = holdingDuration / 60;
    const hoursHeld = holdingDuration / 3600;

    // 1. Calculate Base Value
    const heldValueUSD = balanceHODL * priceUSD;

    // 2. Diamond Hand Multiplier Logic
    let multiplier = 0;

    if (minutesHeld < 1) {
      // Anti-MEV / Flash Loan: Zero quota for first 1 min
      return { quota: 0, multiplier: 0, reason: "Cold Start (<1m)" };
    } else if (hoursHeld >= 24) {
      // Full Diamond Hand
      multiplier = 1.0;
    } else {
      // Ramp Up: Starts at 10% (after 5m), adds ~3.75% per hour to reach 100% at 24h
      // Formula: 0.10 + (0.90 * (hoursHeld / 24))
      multiplier = 0.10 + (0.90 * (hoursHeld / 24));
    }

    // 3. Final Quota (Credits)
    // Formula: $10 Held = 100 Credits/Day
    // i.e. Holding Value ($) * 10 = Daily Credits
    const baseCredits = heldValueUSD * 10; 
    
    // Apply Time Multiplier
    const dailyQuota = baseCredits * multiplier;

    return {
      quota: parseFloat(dailyQuota.toFixed(2)), // Round to 2 decimals

      multiplier: parseFloat(multiplier.toFixed(2)),
      reason: multiplier === 1 ? "Max Power" : "Ramping Up"
    };
  }
}
