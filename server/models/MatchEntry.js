import mongoose from "mongoose";
const { Schema, model } = mongoose; //object destructuring


const matchSchema = new Schema({
    gameTitle: String,
    rating: Number
})

const MatchEntry = model("MatchEntry", matchSchema)

export default MatchEntry
