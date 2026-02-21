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
        // NOTE: Awaiting real WEB4AI contract address deployment. 
        // Temporarily set to dead address (Will reject all until updated)
        this.TOKEN_ADDRESS = '0x8004FC7B58399586cA6793ba6629849a78C96AF2'; // TBD 实际发币后修改
        // Robust RPC
        this.provider = new ethers_1.ethers.JsonRpcProvider('https://lb.drpc.live/bsc/At_J2_4UBE0DvXufYTxkBabn_V3jAnoR8IDofhHoK236');
        // ABI: Essential functions only
        const abi = [
            'function balanceOf(address) view returns (uint256)',
            'function decimals() view returns (uint8)'
        ];
        this.contract = new ethers_1.ethers.Contract(this.TOKEN_ADDRESS, abi, this.provider);
    }
    /**
     * Get Web4AI Holding Balance
     */
    async getBalance(wallet) {
        try {
            const [rawBal, decimals] = await Promise.all([
                this.contract.balanceOf(wallet),
                this.contract.decimals()
            ]);
            return parseFloat(ethers_1.ethers.formatUnits(rawBal, decimals));
        }
        catch (e) {
            console.error('[Chain] Balance fetch failed:', e);
            return 0; // Fail safe, effectively denying agent access
        }
    }
    /**
     * Mock operations retained for structural compatibility with state loops
     */
    async getPrice() {
        try {
            // Fetch WEB4AI price via DexScreener (or fallback logic)
            const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${this.TOKEN_ADDRESS}`);
            if (!res.ok)
                return 0.001; // Safeback fallback price
            const data = await res.json();
            if (data.pairs && data.pairs.length > 0) {
                // Sort by liquidity to get the most accurate price
                const primaryPair = data.pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];
                return parseFloat(primaryPair.priceUsd) || 0;
            }
            return 0; // Pre-market / No LP means NO VALUE means NO COMPUTE
        }
        catch (e) {
            console.error('[Chain] Price fetch failed:', e);
            return 0;
        }
    }
    async getLastTransferTime(wallet) {
        return 0;
    }
}
exports.ChainService = ChainService;
