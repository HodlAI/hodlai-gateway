"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaManager = void 0;
/**
 * QuotaManager: The Economic Brain of HODLAI Gateway
 * Evaluates Agent Token Ownership
 */
class QuotaManager {
    /**
     * Value Rating System for WEB4AI/Automaton Agents
     * Applies the "Diamond Hand" recovery formula:
     * 0-5 mins: 0% quota
     * 5 mins: 10% quota
     * Growth: +4% per hour
     * 24h+: 100% quota
     */
    static calculateAgentQuota(balanceTokens, tokenPriceUsd, heldTimeHours = 24 // Defaults to full quota for now unless tracked 
    ) {
        if (balanceTokens <= 0 || tokenPriceUsd <= 0) {
            return { quota: 0, multiplier: 0, reason: "No Tokens or Zero Value" };
        }
        const holdingValueUsd = balanceTokens * tokenPriceUsd;
        const MAX_QUOTA = holdingValueUsd * this.YIELD_RATIO;
        // Diamond Hand Yield Logic
        let percentAvailable = 0;
        const heldMins = heldTimeHours * 60;
        if (heldMins < 5) {
            percentAvailable = 0.0;
        }
        else {
            // Base 10% at 5 mins + 4% for every full hour
            percentAvailable = 0.10 + (Math.floor(heldTimeHours) * 0.04);
            if (percentAvailable > 1.0)
                percentAvailable = 1.0;
        }
        const grantedQuota = parseFloat((MAX_QUOTA * percentAvailable).toFixed(4));
        return {
            quota: grantedQuota,
            multiplier: percentAvailable,
            reason: `Diamond Hand: ${(percentAvailable * 100).toFixed(0)}% (Held: ${heldTimeHours.toFixed(1)}h, Max: $${MAX_QUOTA.toFixed(2)})`
        };
    }
}
exports.QuotaManager = QuotaManager;
// Constant: $10 Held = $1.5 Daily Limit 
QuotaManager.YIELD_RATIO = 0.15;
