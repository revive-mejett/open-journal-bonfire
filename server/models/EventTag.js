import mongoose from "mongoose";
const { Schema, model } = mongoose;
//object destructuring

const magnitudeValidator = (value) => {
    return value >= -10 && value <= 10
}

const frequentEventTagSchema = new Schema({
    keyword: {type: String, required: true, maxLength: 50, immutable: true},
    magnitude: {type: Number, required: true, default: 0, validate: magnitudeValidator, immutable: true},
    weight: {type: Number, required: true, default: 0, immutable: true},
    lastUsed: {type: Date, default: Date.now},
    dateCreated: {type: String, immutable: true, default: Date.now},
    permanent: {type: Boolean, default: false, immutable: true},
    frequency: {type: Number, default: 1}
})

frequentEventTagSchema.pre("save", (next) => {
    this.weight = 5 ** Math.abs(this.magnitude) * (this.magnitude > 0 ? 1 : -1)
    next()
})

const frequentEventTag = model("FrequentEventTag", frequentEventTagSchema)

export default frequentEventTag
