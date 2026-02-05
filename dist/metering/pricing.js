"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCalculator = exports.MODEL_PRICES = void 0;
/**
 * Model Pricing Registry (USD per 1M Tokens)
 * Source: Official updates as of Feb 2026
 */
exports.MODEL_PRICES = {
    // OpenAI
    'gpt-4o': { prompt: 2.50, completion: 10.00 },
    'gpt-4o-mini': { prompt: 0.15, completion: 0.60 },
    'o3-mini': { prompt: 1.10, completion: 4.40 }, // Reasoning model
    // Anthropic
    'claude-3-5-sonnet-latest': { prompt: 3.00, completion: 15.00 },
    'claude-3-5-haiku-latest': { prompt: 0.25, completion: 1.25 },
    // Google
    'gemini-2.0-flash': { prompt: 0.10, completion: 0.40 },
    'gemini-1.5-pro': { prompt: 1.25, completion: 5.00 },
    // DeepSeek via aggregators (OpenRouter-like pricing)
    'deepseek-r1': { prompt: 0.55, completion: 2.19 },
};
/**
 * Cost Calculator
 */
class CostCalculator {
    /**
     * Calculate exact cost for a request
     */
    static estimate(model, inputTokens, outputTokens) {
        const pricing = exports.MODEL_PRICES[model];
        if (!pricing) {
            console.warn(`[Cost] Unknown model: ${model}, using fallback (gpt-4o-mini rates)`);
            return (inputTokens * 0.15 + outputTokens * 0.60) / 1000000;
        }
        const inputCost = (inputTokens / 1000000) * pricing.prompt;
        const outputCost = (outputTokens / 1000000) * pricing.completion;
        // Return cost in USD (with 8 decimals precision for micro-transactions)
        return parseFloat((inputCost + outputCost).toFixed(8));
    }
}
exports.CostCalculator = CostCalculator;
