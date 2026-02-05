import Redis from 'ioredis';

/**
 * State Manager: The Bank Ledger
 * Manages user quotas.
 * Supports Redis (Production) and In-Memory (Dev/Fallback).
 */
export class QuotaService {
  private redis: Redis | null = null;
  private readonly KEY_PREFIX = 'hodlai:quota:';
  private memoryStore: Map<string, number> = new Map(); // Fallback Store

  constructor(redisUrl: string = process.env.REDIS_URL || 'redis://localhost:6379') {
    // Only connect to Redis if explicitly configured in Prod, else use mock or try
    // For this environment (No Docker), we default to Memory to avoid crashes.
    if (process.env.NODE_ENV === 'production' && !process.env.FORCE_MEMORY) {
      this.redis = new Redis(redisUrl, {
        retryStrategy: () => null, // Don't retry endlessly if failed
        maxRetriesPerRequest: 1
      });
      
      this.redis.on('error', (err) => {
        console.warn('[State] Redis connection failed, falling back to In-Memory.', err.message);
        this.redis = null; // Switch to memory
      });
    } else {
      console.log('[State] Running in In-Memory Mode (No Redis)');
    }
  }

  async refreshQuota(wallet: string, dailyLimitUSD: number) {
    if (this.redis) {
      const key = this.KEY_PREFIX + wallet;
      const exists = await this.redis.exists(key);
      if (!exists) {
        await this.redis.set(key, dailyLimitUSD, 'EX', 86400);
      }
    } else {
      // Memory
      if (!this.memoryStore.has(wallet)) {
        this.memoryStore.set(wallet, dailyLimitUSD);
        console.log(`[State] Memory: Refreshed quota for ${wallet}: $${dailyLimitUSD}`);
      }
    }
  }

  async getBalance(wallet: string): Promise<number> {
    if (this.redis) {
      const bal = await this.redis.get(this.KEY_PREFIX + wallet);
      return bal ? parseFloat(bal) : 0;
    } else {
      return this.memoryStore.get(wallet) || 0;
    }
  }

  async deduct(wallet: string, cost: number): Promise<boolean> {
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
      } catch (e) {
        // Fallback if Redis dies mid-flight
        this.redis = null; 
        return this.deduct(wallet, cost);
      }
    } else {
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
