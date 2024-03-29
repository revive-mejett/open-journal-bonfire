import mongoose from "mongoose";
const { Schema, model } = mongoose;
//object destructuring


const entrySchema = new Schema({
    title: {type: String, required: true},
    entryContent: {type: String, trim: true, maxLength: 7000},
    selfRating: {type: Number, min: -10, max: 10},
    greatEvents: [{
        keyword: {type: String},
        weight: {type: Number},
        lastUsed: {type: Date}
    }],
    neutralEvents: [{
        keyword: {type: String},
        weight: {type: Number},
        lastUsed: {type: Date}
    }],
    badEvents: [{
        keyword: {type: String},
        weight: {type: Number},
        lastUsed: {type: Date}
    }],
    flairs: {type: [String], default: []},   
    // keywords which will be displayed on a card (ex: birthday, passed exam, had breakup)
    numberHotWords: {type: Number, immutable: true, default: 0},
    numberRedHotWords: {type: Number, immutable: true, default: 0},
    numberBlacklistedWords: {type: Number, immutable: true, default: 0},
    isExplicit: {type: Boolean, immutable: true, default: false},
    isTooExplicit: {type: Boolean, immutable: true, default: false},
    averageKeywordMagnitude: {type: Number, immutable: true, default: 0},
    dateCreated: {type: Date, default: Date.now},
})

const JournalEntry = model("JournalEntry", entrySchema)

export default JournalEntry
