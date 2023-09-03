import mongoose from "mongoose";
const { Schema, model } = mongoose; //object destructuring


const entrySchema = new Schema({
    title: {type: String, required: true},
    entryContent: {type: String, trim: true, maxLength: 500},
    selfRating: {type: Number, min: 1, max: 10},
    greatEvents: {type: [String], default: []},
    neutralEvents: {type: [String], default: []},
    badEvents: {type: [String], default: []},
    flairs: {type: [String], default: []},    // keywords which will be displayed on a card (ex: birthday, passed exam, had breakup)
    dateCreated: {type: Date, default: Date.now()}
})

const JournalEntry = model("JournalEntry", entrySchema)

export default JournalEntry
