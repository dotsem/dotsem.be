interface RateLimitRecord {
    count: number;
    resetTime: number;
}

const cache = new Map<string, RateLimitRecord>();
const MAX_CACHE_SIZE = 3000;
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

export function rateLimit(ip: string, limit: number, windowMs: number): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
} {
    const now = Date.now();

    // evict oldest keys when capacity limit is breached under heavy load to prevent memory leaks
    if (cache.size > MAX_CACHE_SIZE) {
        const keysToEvict = Array.from(cache.keys()).slice(0, 500);
        for (const k of keysToEvict) {
            cache.delete(k);
        }
    }

    // throttle cleanup iterations to once per interval to minimize cpu impact under high traffic
    if (now - lastCleanup > CLEANUP_INTERVAL) {
        lastCleanup = now;
        for (const [key, record] of cache.entries()) {
            if (now > record.resetTime) {
                cache.delete(key);
            }
        }
    }

    const record = cache.get(ip);

    if (!record || now > record.resetTime) {
        const newRecord = {
            count: 1,
            resetTime: now + windowMs
        };
        cache.set(ip, newRecord);
        return {
            success: true,
            limit,
            remaining: limit - 1,
            reset: newRecord.resetTime
        };
    }

    if (record.count >= limit) {
        return {
            success: false,
            limit,
            remaining: 0,
            reset: record.resetTime
        };
    }

    record.count += 1;
    return {
        success: true,
        limit,
        remaining: limit - record.count,
        reset: record.resetTime
    };
}
