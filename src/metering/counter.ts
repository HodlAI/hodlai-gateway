import { encodingForModel, TiktokenModel } from "js-tiktoken";

/**
 * Token Counter
 * Handles precise token counting for inputs/outputs to ensure accurate billing.
 */
export class TokenCounter {
  // Cache encoders to avoid re-initialization overhead
  private static encoders: Map<string, any> = new Map();

  /**
   * Count tokens for a string based on the model
   */
  static count(text: string, model: string = 'gpt-4o'): number {
    if (!text) return 0;
    
    try {
      const encoder = this.getEncoder(model);
      return encoder.encode(text).length;
    } catch (e) {
      // Fallback: Crude estimation (char count / 4) if model unknown or error
      return Math.ceil(text.length / 4);
    }
  }

  /**
   * Get or create encoder for a model
   */
  private static getEncoder(model: string) {
    // Map generic/new models to compatible encoders
    let encodingModel = model;
    
    if (model.startsWith('gpt-4') || model.startsWith('o1') || model.startsWith('o3')) {
      encodingModel = 'gpt-4o';
    } else if (model.includes('claude') || model.includes('gemini') || model.includes('deepseek')) {
      // Use cl100k_base (GPT-4) as proxy for most modern LLMs (very similar tokenization)
      encodingModel = 'gpt-4o';
    }

    if (!this.encoders.has(encodingModel)) {
      this.encoders.set(encodingModel, encodingForModel(encodingModel as TiktokenModel));
    }
    return this.encoders.get(encodingModel);
  }
}
