import mongoose from "mongoose";
const { Schema, model } = mongoose; //object destructuring


const matchSchema = new Schema({
    gameTitle: {type: String, required: true},
    entryContent: {type: String, trim: true, maxLength: 500},
    isWon: {type: Boolean, required: true},
    teamReview: {type: [String], default:[]},
    teamPerformance: {type: [String], default: []},
    events: {type: [String], default: []},
    selfRating: {type: Number, min: 1, max: 10},
    dateCreated: {type: Date, default: Date.now()}
})

const MatchEntry = model("MatchEntry", matchSchema)

export default MatchEntry
