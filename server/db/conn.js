import mongoose from "mongoose";
import MatchEntry from "../models/MatchEntry.js";
import JournalEntry from "../models/JournalEntry.js";
import FrequentEventTag from "../models/EventTag.js";
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

        const testTag = new FrequentEventTag({
            keyword: "test event tag",
            magnitude: 10,
            permanent: true
        })

        await testTag.save()
    }

    /**
     * disconnect from MongoDB
     */
    async disconnectFromDb() {
        await mongoose.connection.close()
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
        let newEntryDocument = await newEntry.save();
        return newEntryDocument
    }

    
    async getAllEntries() {
        const entries = await MatchEntry.find({})
        return entries
    }

    //get all journal entries from the db
    async getAllJournalEntries() {
        const entries = JournalEntry.find({})
        return entries
    }


    async getFilteredJournalEntries(filterOptions, sortOption) {
        let sortOrder = {dateCreated: -1}
    
        if (sortOption === "oldest") {
            sortOrder = {dateCreated: 1}
        } else if (sortOption === "newest") {
            sortOrder = {dateCreated: -1}
        } else if (sortOption === "lowSelfRating") {
            sortOrder = {selfRating: 1}
        } else if (sortOption === "highSelfRating") {
            sortOrder = {selfRating: -1}
        }

        const entries = await JournalEntry.find({
            title: { $regex: filterOptions.titleFilterMatch},
            entryContent: { $regex: filterOptions.entryContentMatch},
            selfRating: { $gte : filterOptions.minSelfRating, $lte : filterOptions.maxSelfRating},
        }).sort(sortOrder)
        return entries
    }

    //get a specific journal entry by its id
    async getJournalEntryById(id) {
        try {
            const entry = await JournalEntry.findById(id)
            return entry
        } catch (error) {
            return undefined
        }
        
    }

    async getRandomJournalEntry() {
        const randomEntryArray = await JournalEntry.aggregate([{
            $sample: {size : 1}
        }])
        return randomEntryArray[0]
    }
}


export default Database