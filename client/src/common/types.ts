
/**
 * represents a keyword tag linked to a journal entry
 */
export type EventTag = {
    keyword: string,
    magnitude?: number,
    weight?: number,
    lastUsed?: Boolean,
}

/**
 * represents a journal entry
 */
export type JournalEntry = {
    _id?: string
    title: string,
    entryContent: string,
    dateCreated: string,
    selfRating: number,
    greatEvents: EventTag[],
    neutralEvents: EventTag[],
    badEvents: EventTag[],
    numberHotWords: number,
    numberRedHotWords: number,
    numberBlacklistedHotWords: number,
    isExplicit: Boolean,
    isTooExplicit: Boolean
}

/**
 * event tag types can be positive, neutral or negative
 */
export type EventTagType =  "positive" | "neutral" | "negative"
