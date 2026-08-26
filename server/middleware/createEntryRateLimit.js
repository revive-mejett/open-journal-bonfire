const FIVE_MINUTES_MS = 5 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_PER_FIVE_MINUTES = 3;
const MAX_PER_HOUR = 10;

/** @type {Map<string, number[]>} */
const timestampsByIp = new Map();

function getClientIp(req) {
    return req.ip || req.socket?.remoteAddress || "unknown";
}

function pruneOldTimestamps(timestamps, now) {
    const cutoff = now - ONE_HOUR_MS;
    let start = 0;
    while (start < timestamps.length && timestamps[start] <= cutoff) {
        start += 1;
    }
    return start > 0 ? timestamps.slice(start) : timestamps;
}

// Drop stale IP buckets so the in-memory map does not grow without bound.
setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of timestampsByIp) {
        const pruned = pruneOldTimestamps(timestamps, now);
        if (pruned.length === 0) {
            timestampsByIp.delete(ip);
        } else {
            timestampsByIp.set(ip, pruned);
        }
    }
}, ONE_HOUR_MS).unref();

/**
 * IP-based rate limit for anonymous journal entry creation:
 * - max 3 creates per 5 minutes
 * - max 10 creates per hour
 */
export function createEntryRateLimit(req, res, next) {
    const now = Date.now();
    const ip = getClientIp(req);
    let timestamps = pruneOldTimestamps(timestampsByIp.get(ip) || [], now);

    const recentFiveMinutes = timestamps.filter((t) => now - t < FIVE_MINUTES_MS).length;
    const recentHour = timestamps.length;

    if (recentFiveMinutes >= MAX_PER_FIVE_MINUTES || recentHour >= MAX_PER_HOUR) {
        if (timestamps.length === 0) {
            timestampsByIp.delete(ip);
        } else {
            timestampsByIp.set(ip, timestamps);
        }
        return res.status(429).json({
            status: "error",
            payload: "Too many journal entries created. Please try again later."
        });
    }

    timestamps.push(now);
    timestampsByIp.set(ip, timestamps);
    next();
}
