"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const ethers_1 = require("ethers");
/**
 * Basic SIWE / Arbitrary Auth Validator
 * To accommodate different Agent implementations (and standard SIWE)
 */
class AuthValidator {
    static async verify(message, signature) {
        try {
            // Recover the Ethereum address from the signed string
            const recoveredAddress = (0, ethers_1.verifyMessage)(message, signature);
            // We don't want to enforce tight SIWE string parsing because 
            // some agents use 'siwe' npm module, others roll their own string.
            // We'll trust the recovered address if it signs the nonce we gave it.
            return recoveredAddress;
        }
        catch (e) {
            console.error('[Auth] Verification Failed:', e);
            return null;
        }
    }
}
exports.AuthValidator = AuthValidator;
