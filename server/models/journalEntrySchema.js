import mongoose from "mongoose";

const { Schema } = mongoose;

/** Shared journal entry fields for live and burned collections. */
export const journalEntrySchema = new Schema({
    title: { type: String, required: true },
    entryContent: { type: String, trim: true, maxLength: 7000 },
    selfRating: { type: Number, min: -10, max: 10 },
    greatEvents: [{
        keyword: { type: String },
        weight: { type: Number },
        lastUsed: { type: Date },
    }],
    neutralEvents: [{
        keyword: { type: String },
        weight: { type: Number },
        lastUsed: { type: Date },
    }],
    badEvents: [{
        keyword: { type: String },
        weight: { type: Number },
        lastUsed: { type: Date },
    }],
    flairs: { type: [String], default: [] },
    numberHotWords: { type: Number, immutable: true, default: 0 },
    numberRedHotWords: { type: Number, immutable: true, default: 0 },
    numberBlacklistedWords: { type: Number, immutable: true, default: 0 },
    isExplicit: { type: Boolean, immutable: true, default: false },
    isTooExplicit: { type: Boolean, immutable: true, default: false },
    averageKeywordMagnitude: { type: Number, immutable: true, default: 0 },
    dateCreated: { type: Date, default: Date.now },
});
