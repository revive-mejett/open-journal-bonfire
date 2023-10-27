import mongoose from "mongoose";
const { Schema, model } = mongoose;
//object destructuring


const entrySchema = new Schema({
    title: {type: String, required: true},
    entryContent: {type: String, trim: true, maxLength: 7000},
    selfRating: {type: Number, min: 1, max: 10},
    greatEvents: [{
        keyword: {type: String},
        magnitude: {type: Number},
        weight: {type: Number},
    }],
    neutralEvents: [{
        keyword: {type: String},
        magnitude: {type: Number},
        weight: {type: Number},
    }],
    badEvents: [{
        keyword: {type: String},
        magnitude: {type: Number},
        weight: {type: Number},
    }],
    flairs: {type: [String], default: []},   
    // keywords which will be displayed on a card (ex: birthday, passed exam, had breakup)
    dateCreated: {type: Date, default: Date.now}
})

const JournalEntry = model("JournalEntry", entrySchema)

export default JournalEntry
