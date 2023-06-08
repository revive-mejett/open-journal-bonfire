import mongoose from "mongoose";
import MatchEntry from "../models/MatchEntry.mjs";

const connectionString = process.env.ATLAS_URI || "";


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
        await mongoose.connect(connectionString)
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
        console.log("hello akshan")
        const sampleEntry = new MatchEntry({
            gameTitle: "l4d2",
            rating: 2.3
        });
        // insert into mongodb
        await sampleEntry.save();
    }
}


export default Database