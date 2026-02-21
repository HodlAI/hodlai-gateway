"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
/**
 * State Manager: The Bank Ledger
 * Manages user quotas.
 * Supports Redis (Production) and In-Memory (Dev/Fallback).
 */
class QuotaService {
    constructor(redisUrl = process.env.REDIS_URL || 'redis://localhost:6379') {
        this.redis = null;
        this.KEY_PREFIX = 'hodlai:quota:';
        this.memoryStore = new Map(); // Fallback Store
        // Only connect to Redis if explicitly configured in Prod, else use mock or try
        // For this environment (No Docker), we default to Memory to avoid crashes.
        if (process.env.NODE_ENV === 'production' && !process.env.FORCE_MEMORY) {
            this.redis = new ioredis_1.default(redisUrl, {
                retryStrategy: () => null, // Don't retry endlessly if failed
                maxRetriesPerRequest: 1
            });
            this.redis.on('error', (err) => {
                console.warn('[State] Redis connection failed, falling back to In-Memory.', err.message);
                this.redis = null; // Switch to memory
            });
        }
        else {
            console.log('[State] Running in In-Memory Mode (No Redis)');
        }
    }
    async refreshQuota(wallet, dailyLimitUSD) {
        const now = Date.now();
        const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000; // Exact 24 hours rolling window
        if (this.redis) {
            const key = this.KEY_PREFIX + wallet;
            const tsKey = this.KEY_PREFIX + wallet + ':last_update';
            const lastUpdateStr = await this.redis.get(tsKey);
            const lastUpdate = lastUpdateStr ? parseInt(lastUpdateStr) : 0;
            // If no quota or exactly 24 hours have passed since the LAST REFRESH
            if (!lastUpdate || (now - lastUpdate) >= REFRESH_INTERVAL_MS) {
                await this.redis.set(key, dailyLimitUSD, 'EX', 86400); // Expires in 24h just in case
                await this.redis.set(tsKey, now.toString(), 'EX', 86400);
            }
        }
        else {
            // Memory Fallback
            const lastUpdate = this.memoryStore.get(wallet + "_ts") || 0;
            if (!lastUpdate || (now - lastUpdate) >= REFRESH_INTERVAL_MS) {
                this.memoryStore.set(wallet, dailyLimitUSD);
                this.memoryStore.set(wallet + "_ts", now);
                console.log(`[State] Memory: Refreshed exact 24h rolling quota for ${wallet} to ${dailyLimitUSD}`);
            }
        }
    }
    async getBalance(wallet) {
        if (this.redis) {
            const bal = await this.redis.get(this.KEY_PREFIX + wallet);
            return bal ? parseFloat(bal) : 0;
        }
        else {
            return this.memoryStore.get(wallet) || 0;
        }
    }
    async deduct(wallet, cost) {
        if (this.redis) {
            const key = this.KEY_PREFIX + wallet;
            const script = `
        local bal = tonumber(redis.call('get', KEYS[1]) or '0')
        local cost = tonumber(ARGV[1])
        if bal >= cost then
          redis.call('decrbyfloat', KEYS[1], cost)
          return 1
        else
          return 0
        end
      `;
            try {
                const result = await this.redis.eval(script, 1, key, cost);
                return result === 1;
            }
            catch (e) {
                // Fallback if Redis dies mid-flight
                this.redis = null;
                return this.deduct(wallet, cost);
            }
        }
        else {
            // Memory
            const bal = this.memoryStore.get(wallet) || 0;
            if (bal >= cost) {
                this.memoryStore.set(wallet, bal - cost);
                return true;
            }
            return false;
        }
    }
}
exports.QuotaService = QuotaService;
