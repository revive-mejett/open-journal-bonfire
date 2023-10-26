import mongoose from "mongoose";
const { Schema, model } = mongoose;
//object destructuring


const frequentEventTagSchema = new Schema({
    keyword: {type: String, required: true, maxLength: 50},
    type: {type: String, required: true, default: "neutral"},
    weight: {type: Number, required: true, default: 5},
    lastUsed: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now},
    permanent: {type: Boolean, default: false},
    frequency: {type: Number, default: 1}
})

const JournalEntry = model("FrequentEventTag", frequentEventTagSchema)

export default JournalEntry
