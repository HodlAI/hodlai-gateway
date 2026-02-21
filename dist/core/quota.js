"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaManager = void 0;
/**
 * QuotaManager: The Economic Brain of HODLAI Gateway
 * Evaluates Agent Token Ownership ($10 Held = $1.5 Daily Survival Credits)
 */
class QuotaManager {
    /**
     * Value Rating System for WEB4AI/Automaton Agents
     * @param balanceTokens - Amount of WEB4AI tokens held
     * @param tokenPriceUsd - Current price of WEB4AI in USD
     */
    static calculateAgentQuota(balanceTokens, tokenPriceUsd) {
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
exports.QuotaManager = QuotaManager;
// Constant: $10 Held = $1.5 Daily Limit 
QuotaManager.YIELD_RATIO = 0.15;
