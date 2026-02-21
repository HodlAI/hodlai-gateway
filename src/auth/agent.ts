import { verifyMessage } from 'ethers';

/**
 * Automaton Agent Auth
 * Strictly server-to-server machine auth, no human SIWE loops.
 */
export class AgentAuthValidator {
  
  /**
   * Verify an Agent's Signature
   * @param message - The raw message string (Format: "WEB4AI_AGENT_LOGIN:{timestamp}")
   * @param signature - The hex signature
   * @returns wallet address if valid and fresh, null otherwise
   */
  static async verify(message: string, signature: string): Promise<string | null> {
    try {
      // 1. Recover Address
      const recoveredAddress = verifyMessage(message, signature);
      
      // 2. Validate Origin & Intent
      if (!message.startsWith('WEB4AI_AGENT_LOGIN:')) {
         return null;
      }

      // 3. Strict Replay Protection (Must be signed within last 60 seconds)
      const parts = message.split(':');
      if (parts.length >= 2) {
         const ts = parseInt(parts[1], 10);
         const now = Math.floor(Date.now() / 1000);
         if (isNaN(ts) || Math.abs(now - ts) > 60) {
            console.warn(`[Agent Auth] Stale or invalid signature timestamp from ${recoveredAddress}. TS=${ts} NOW=${now}`);
            return null; 
         }
      } else {
         return null;
      }

      return recoveredAddress; 
    } catch (e) {
      console.error('[Agent Auth] Verification Failed:', e);
      return null;
    }
  }
}
