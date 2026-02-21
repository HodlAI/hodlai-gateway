"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainService = void 0;
const ethers_1 = require("ethers");
/**
 * Chain Service for Web4AI/Automaton Agents
 * Validates on-chain identity and token holdings
 */
class ChainService {
    constructor() {
        // Hardcoded RPC fallback
        this.RPC_URL = process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org';
        // NOTE: Awaiting real WEB4AI contract address deployment. 
        this.TOKEN_ADDRESS = '0x8004FC7B58399586cA6793ba6629849a78C96AF2';
        this.provider = new ethers_1.ethers.JsonRpcProvider(this.RPC_URL);
    }
    /**
     * Return contract with a new provider to avoid connection death
     */
    getContract() {
        // ABI: Essential functions only + ERC20 extended tracking if ever added
        const abi = [
            'function balanceOf(address) view returns (uint256)',
            'function decimals() view returns (uint8)'
        ];
        return new ethers_1.ethers.Contract(this.TOKEN_ADDRESS, abi, this.provider);
    }
    /**
     * Get Web4AI Holding Balance
     */
    async getBalance(wallet) {
        try {
            const contract = this.getContract();
            const rawBal = await contract.balanceOf(wallet);
            const decimals = await contract.decimals();
            return parseFloat(ethers_1.ethers.formatUnits(rawBal, decimals));
        }
        catch (e) {
            console.error('[Chain] Balance fetch failed:', e);
            return 0; // Better to deny access than allow free on error
        }
    }
    /**
     * Stub for token hold time (Block/Timestamp mapping)
     * This is challenging to perfectly track without a subgraph or dedicated on-chain mapping
     * (Standard ERC20 doesn't track "when did they last buy").
     * For the Gateway proxy we return 24 hours (Full Quota) until an indexer is added.
     * If token is transferred away, the gateway drops their quota size on next poll.
     */
    async getHoldTimeHours(wallet) {
        return 24; // Default full maturation
    }
    /**
     * Fetch current value of $WEB4AI token
     */
    async getPrice() {
        try {
            // Stub: Should hit DexScreener/Pancake oracle. 
            // Hardcoded stub for gateway testing.
            return parseFloat(process.env.WEB4AI_PRICE_USD || '0.005');
        }
        catch (e) {
            console.error('[Chain] Price Oracle Failed:', e);
            return 0.005; // Fallback
        }
    }
}
exports.ChainService = ChainService;
