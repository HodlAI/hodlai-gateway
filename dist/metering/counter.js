"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCounter = void 0;
const js_tiktoken_1 = require("js-tiktoken");
/**
 * Token Counter
 * Handles precise token counting for inputs/outputs to ensure accurate billing.
 */
class TokenCounter {
    /**
     * Count tokens for a string based on the model
     */
    static count(text, model = 'gpt-4o') {
        if (!text)
            return 0;
        try {
            const encoder = this.getEncoder(model);
            return encoder.encode(text).length;
        }
        catch (e) {
            // Fallback: Crude estimation (char count / 4) if model unknown or error
            return Math.ceil(text.length / 4);
        }
    }
    /**
     * Get or create encoder for a model
     */
    static getEncoder(model) {
        // Map generic/new models to compatible encoders
        let encodingModel = model;
        if (model.startsWith('gpt-4') || model.startsWith('o1') || model.startsWith('o3')) {
            encodingModel = 'gpt-4o';
        }
        else if (model.includes('claude') || model.includes('gemini') || model.includes('deepseek')) {
            // Use cl100k_base (GPT-4) as proxy for most modern LLMs (very similar tokenization)
            encodingModel = 'gpt-4o';
        }
        if (!this.encoders.has(encodingModel)) {
            this.encoders.set(encodingModel, (0, js_tiktoken_1.encodingForModel)(encodingModel));
        }
        return this.encoders.get(encodingModel);
    }
}
exports.TokenCounter = TokenCounter;
// Cache encoders to avoid re-initialization overhead
TokenCounter.encoders = new Map();
