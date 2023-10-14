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
        const sampleEntry = new JournalEntry({
            title: "Another day what do I say",
            entryContent: "Unfortunately got fi",
            flairs: "spaghetti and timmies",
            greatEvents: ["enjoyed spaghetti code", "played left 4 dead 2", "got timmies!"],
            neutralEvents: ["has some water", "took a walk", "I slept"],
            badEvents: ["bad day at work"],
            selfRating: 8,
        });
        // insert into mongodb
        await sampleEntry.save();
    }

    async createEntry(entry) {
        let flairs = []

        //for now the flairs for a journal entry will be the first keyword of each event type (great/ok/bad)
        if (entry.greatEvents.length > 0) {
            flairs.push(entry.greatEvents[0])
        }
        if (entry.neutralEvents.length > 0) {
            flairs.push(entry.neutralEvents[0])
        }
        if (entry.badEvents.length > 0) {
            flairs.push(entry.badEvents[0])
        }

        const newEntry = new JournalEntry({
            title: entry.title,
            entryContent: entry.entryContent,
            flairs: flairs,
            greatEvents: entry.greatEvents,
            neutralEvents: entry.neutralEvents,
            badEvents: entry.badEvents,
            selfRating: entry.selfRating,
        });

        // insert into mongodb
        await newEntry.save();
    }

    async getAllEntries() {
        const entries = await MatchEntry.find({})
        return entries
    }

    async getAllJournalEntries() {
        const entries = await JournalEntry.find({})
        return entries
    }

    async getJournalEntryById(id) {
        const entry = await JournalEntry.findById(id)
        return entry
    }
}


export default Database