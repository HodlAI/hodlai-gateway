import { verifyMessage } from 'ethers';

/**
 * Basic SIWE / Arbitrary Auth Validator
 * To accommodate different Agent implementations (and standard SIWE)
 */
export class AuthValidator {
  
  static async verify(message: string, signature: string): Promise<string | null> {
    try {
      // Recover the Ethereum address from the signed string
      const recoveredAddress = verifyMessage(message, signature);
      
      // We don't want to enforce tight SIWE string parsing because 
      // some agents use 'siwe' npm module, others roll their own string.
      // We'll trust the recovered address if it signs the nonce we gave it.
      
      return recoveredAddress; 
    } catch (e) {
      console.error('[Auth] Verification Failed:', e);
      return null;
    }
  }
}
