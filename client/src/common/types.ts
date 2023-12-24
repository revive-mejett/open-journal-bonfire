export type EventTag = {
    keyword: string
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
