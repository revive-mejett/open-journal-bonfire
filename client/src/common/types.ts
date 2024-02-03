export type EventTag = {
    keyword: string,
    magnitude?: number,
    weight?: number,
    lastUsed?: Boolean,
}

export type JournalEntry = {
    _id?: string
    title: string,
    entryContent: string,
    dateCreated: string,
    selfRating: number,
    greatEvents: EventTag[],
    neutralEvents: EventTag[],
    badEvents: EventTag[]
}

export type EventTagType =  "positive" | "neutral" | "negative"
