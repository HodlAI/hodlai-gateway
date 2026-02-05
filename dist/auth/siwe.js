"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const ethers_1 = require("ethers");
/**
 * SIWE (Sign-In with Ethereum) Validator
 * Standard: Custom Simple Auth (MVP)
 */
class AuthValidator {
    /**
     * Verify a Signed Message
     * @param message - The raw message string (Must contain "HODLAI" and timestamp)
     * @param signature - The hex signature
     * @returns wallet address if valid, null otherwise
     */
    static async verify(message, signature) {
        try {
            // 1. Recover Address
            const recoveredAddress = (0, ethers_1.verifyMessage)(message, signature);
            // 2. Validate Content (Basic Replay Protection)
            // Message must imply intent for this protocol
            if (!message.includes('HODLAI'))
                return null;
            // 3. (Optional) Check Timestamp in message to prevent forever-replay
            // Assuming naive format: "... Timestamp: 1234567890"
            // const tsMatch = message.match(/Timestamp: (\d+)/);
            // if (tsMatch) {
            //    const ts = parseInt(tsMatch[1]);
            //    if (Date.now()/1000 - ts > 300) return null; // 5 min expiry
            // }
            return recoveredAddress;
        }
        catch (e) {
            console.error('[Auth] Verification Failed:', e);
            return null;
        }
    }
}
exports.AuthValidator = AuthValidator;
