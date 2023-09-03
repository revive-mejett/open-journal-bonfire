import mongoose from "mongoose";
import MatchEntry from "../models/MatchEntry.js";
import JournalEntry from "../models/JournalEntry.js";

//singleton instance
let instance = null

class Database {

    /**
     * get/create a singleton of the database instance
     */
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    /**
     * connect to MongoDB
     */
    async connectToDb() {
        console.log("Connecting to MongoDB")
        await mongoose.connect(process.env.ATLAS_URI)
        console.log("Connected to MongoDB")
    }

    /**
     * disconnect from MongoDB
     */
    async disconnectFromDb() {
        await mongoose.connection.close()
    }

    /**
     * for testing, delete this later
     */
    async createTestEntry() {
        // Create a new match entry
        const sampleEntry = new MatchEntry({
            gameTitle: "l4d2",
            entryContent: "My team did really well. Our rochelle went down halfway but our coach was our savior",
            isWon: true,
            teamReview: ["pro coach", "rochelle a bit new", "everyone survived"],
            teamPerformance: ["pro coach", "rochelle a bit new", "everyone survived"],
            events: ["rochelle almost died"],
            selfRating: 8,
        });
        // insert into mongodb
        await sampleEntry.save();
    }

    async getAllEntries() {
        const entries = await JournalEntry.find({})
        return entries
    }
}


export default Database