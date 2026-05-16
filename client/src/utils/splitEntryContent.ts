/**
 * Splits entry text into page-sized chunks that fit within measured heights.
 * Breaks prefer word or newline boundaries when possible.
 */
export function splitTextIntoPages(
    text: string,
    measureHeight: (slice: string) => number,
    maxHeightForPage: (pageIndex: number) => number
): string[] {
    if (!text) {
        return [""];
    }

    const pages: string[] = [];
    let remaining = text;
    let pageIndex = 0;

    while (remaining.length > 0) {
        const maxHeight = maxHeightForPage(pageIndex);
        if (maxHeight <= 0) {
            pages.push(remaining);
            break;
        }

        let low = 1;
        let high = remaining.length;
        let bestFit = 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const height = measureHeight(remaining.slice(0, mid));
            if (height <= maxHeight) {
                bestFit = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        let end = bestFit;
        if (end < remaining.length) {
            const candidate = remaining.slice(0, end);
            const lastNewline = candidate.lastIndexOf("\n");
            const lastSpace = candidate.lastIndexOf(" ");
            const lastBreak = Math.max(lastNewline, lastSpace);
            if (lastBreak > 0 && lastBreak >= end * 0.4) {
                end = lastBreak + 1;
            }
        }

        if (end <= 0) {
            end = 1;
        }

        pages.push(remaining.slice(0, end).trimEnd());
        remaining = remaining.slice(end).trimStart();
        pageIndex += 1;
    }

    return pages.length > 0 ? pages : [""];
}
