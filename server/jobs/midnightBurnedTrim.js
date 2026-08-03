import Database from "../db/dboperation.js";

/** Milliseconds until the next 00:00:00.000 UTC. */
function msUntilNextMidnightUtc(now = new Date()) {
    const next = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0, 0, 0, 0
    ));
    return next.getTime() - now.getTime();
}

/**
 * Schedule burned-entry overflow cleanup for every midnight UTC.
 * Excess rows are allowed during the day and trimmed at 12:00 AM UTC.
 */
export function startMidnightBurnedTrimJob() {
    const db = new Database();
    let timeoutId = null;

    async function runTrim() {
        try {
            const result = await db.trimOldestBurnedEntriesIfOverLimit();
            if (result.deletedCount > 0) {
                console.log(
                    `[midnightBurnedTrim] Removed ${result.deletedCount} oldest burned entries; ${result.remainingCount} remain`
                );
            } else {
                console.log(
                    `[midnightBurnedTrim] No burned entries over limit (${result.remainingCount} total)`
                );
            }
        } catch (error) {
            console.error("[midnightBurnedTrim] Failed to trim burned entries:", error);
        }
    }

    function scheduleNext() {
        const delay = msUntilNextMidnightUtc();
        timeoutId = setTimeout(async () => {
            await runTrim();
            scheduleNext();
        }, delay);
        // Keep the timer from blocking process exit in unusual shutdown paths;
        // the HTTP server already keeps the process alive.
        if (typeof timeoutId.unref === "function") {
            timeoutId.unref();
        }
        const nextAt = new Date(Date.now() + delay).toISOString();
        console.log(`[midnightBurnedTrim] Next run scheduled for ${nextAt}`);
    }

    scheduleNext();

    return {
        stop() {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        },
    };
}
