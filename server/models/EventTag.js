import mongoose from "mongoose";
const { Schema, model } = mongoose;
//object destructuring

const magnitudeValidator = (value) => {
    return value >= -10 && value <= 10
}

const calculateWeight = (magnitude) => {
    if (magnitude === 0) {
        return 0
    } else {
        return 5 * 2 ** Math.abs(magnitude) * (magnitude > 0 ? 1 : -1)
    }
}
 

const frequentEventTagSchema = new Schema({
    keyword: {type: String, required: true, maxLength: 50, immutable: true, unique: true},
    magnitude: {type: Number, required: true, default: 0, validate: magnitudeValidator, immutable: true},
    weight: {type: Number, required: true, immutable: true, default: 0},
    lastUsed: {type: Date, default: Date.now},
    dateCreated: {type: Date, immutable: true, default: Date.now},
    permanent: {type: Boolean, default: false, immutable: true},
    frequency: {type: Number, default: 1}
})

frequentEventTagSchema.pre("save", function(next){
    this.set({weight: calculateWeight(this.magnitude)})
    next()
})

frequentEventTagSchema.pre("insertMany", function(next, docs){
    docs.forEach((doc) => doc.weight = calculateWeight(doc.magnitude))
    next()
})


const FrequentEventTag = model("FrequentEventTag", frequentEventTagSchema)

export default FrequentEventTag
