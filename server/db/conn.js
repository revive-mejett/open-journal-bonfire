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
        let test = await this.getExplicitEntries()
        console.log(test)
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
            flairs.push(entry.greatEvents[0].keyword)
        }
        if (entry.neutralEvents.length > 0) {
            flairs.push(entry.neutralEvents[0].keyword)
        }
        if (entry.badEvents.length > 0) {
            flairs.push(entry.badEvents[0].keyword)
        }

        const newEntry = new JournalEntry({
            title: entry.title,
            entryContent: entry.entryContent,
            flairs: flairs,
            greatEvents: entry.greatEvents,
            neutralEvents: entry.neutralEvents,
            badEvents: entry.badEvents,
            selfRating: entry.selfRating,
            numberHotWords: entry.numberHotWords,
            numberRedHotWords: entry.numberRedHotWords,
            numberBlacklistedWords: entry.numberBlacklistedWords,
            isExplicit: entry.isExplicit,
            isTooExplicit: entry.isTooExplicit,
            averageKeywordMagnitude: entry.averageKeywordMagnitude
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
        let sortOrder = { dateCreated: -1 }

        if (sortOption === "oldest") {
            sortOrder = { dateCreated: 1 }
        } else if (sortOption === "newest") {
            sortOrder = { dateCreated: -1 }
        } else if (sortOption === "lowSelfRating") {
            sortOrder = { selfRating: 1 }
        } else if (sortOption === "highSelfRating") {
            sortOrder = { selfRating: -1 }
        }

        const entries = await JournalEntry.find({
            title: { $regex: filterOptions.titleFilterMatch },
            entryContent: { $regex: filterOptions.entryContentMatch },
            selfRating: { $gte: filterOptions.minSelfRating, $lte: filterOptions.maxSelfRating },
        }).sort(sortOrder)
        return entries
    }

    async getEyeGlaringEntries() {
        try {
            let explicitEntries = await JournalEntry.aggregate([
                {
                    $match: {
                        numberHotWords: { $gt: 0 }
                    }
                },
                {
                    $group: {
                        _id: new Date(),
                        count: { $sum: 1 }
                    }
                }
            ])
            return explicitEntries
        } catch (error) {
            return []
        }
    }

    async getExplicitEntries() {
        try {
            let explicitEntries = await JournalEntry.aggregate([
                {
                    $match: {
                        isExplicit: { $eq: true }
                    }
                },
                {
                    $group: {
                        _id: new Date(),
                        count: { $sum: 1 }
                    }
                }
            ])
            return explicitEntries
        } catch (error) {
            return []
        }
    }

    async getTooExplicitEntries() {
        try {
            let explicitEntries = await JournalEntry.aggregate([
                {
                    $match: {
                        isTooExplicit: { $eq: true }
                    }
                },
                {
                    $group: {
                        _id: new Date(),
                        count: { $sum: 1 }
                    }
                }
            ])
            return explicitEntries
        } catch (error) {
            return []
        }
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
            $sample: { size: 1 }
        }])
        return randomEntryArray[0]
    }

    async getSampleJournalEntries(count) {
        const sampleEntries = await JournalEntry.aggregate([{
            $sample: { size: count }
        }])
        return sampleEntries
    }



    // operations for event tags
    async getEventTags(eventType) {

        let matchCondition = { magnitude: { $eq: 0 } }
        if (eventType === "positive") {
            matchCondition = { magnitude: { $gt: 0 } }
        } else if (eventType === "negative") {
            matchCondition = { magnitude: { $lt: 0 } }
        }
        try {
            let positiveEvents = await FrequentEventTag.aggregate([
                { $match: matchCondition },
                {
                    $sort: {
                        frequency: -1,
                        lastUsed: -1
                    }
                }
            ])
            return positiveEvents
        } catch (error) {
            return []
        }
    }


    //TODO increment the frequency of existing event tags when posting an entry
    // this will pass an array of existing objectids and usee $in operator for updataMany
    async updateEventTags() {
        console.log("to be implemented")
    }

    // statistics operations===
    async getAverageWordCount() {
        const averageWordCount = await JournalEntry.aggregate([
            {
                $project: {
                    entryContentWords: {
                        $split: ["$entryContent", " "]
                    }
                }
            },
            {
                $project: {
                    wordCount: {
                        $size: "$entryContentWords"
                    }
                }
            },
            {
                $group: {
                    _id: new Date(),
                    averageWordCount: {
                        $avg: "$wordCount",
                    }
                }
            },
            {
                $project: {
                    averageWordCount: {
                        $avg: {
                            $round: ["$averageWordCount", 0]
                        },
                    }
                }
            }
        ])
        return averageWordCount
    }

    async getSelfRatedCountByType(choice) {
        let filterCondition

        let entryCount


        switch (choice) {
        case 1:
            filterCondition = { $gt: 0 }
            break;
        case 0:
            filterCondition = { $eq: 0 }
            break;
        case -1:
            filterCondition = { $lt: 0 }
            break;
        default:
            filterCondition = { $gt: 0 }
            break;
        }

        entryCount = await JournalEntry.aggregate([
            {
                $match: {
                    selfRating: filterCondition
                }
            },
            {
                $group: {
                    _id: new Date(),
                    count: { $sum: 1 }
                }
            }
        ])
        return entryCount[0]

    }

    async getSelfRatingDistribution() {
        const collectedSelfRatings = await JournalEntry.aggregate([
            {
                $group: {
                    _id: "$selfRating",
                    numberEntries: { $sum: 1 }
                },

            },
            {
                $project: {
                    rating: "$_id",
                    numberEntries: "$numberEntries",
                    _id: 0,
                },
            },
            {
                $sort: {
                    rating: 1
                },
            }
        ])


        return collectedSelfRatings
    }




    // Might cause performance issues; may have to remove it. 
    async getEventTagUsageFrequency() {
        const eventTagFrequency = await JournalEntry.aggregate([

            {
                //merge all good, neutral and bad events into all event tags for each entry
                $project: {
                    allEventTags: {
                        $concatArrays: ["$greatEvents", "$neutralEvents", "$badEvents"]
                    },
                }
            },
            {
                //group all event tag uses from all the entries86
                $group: {
                    _id: new Date(),
                    combinedEventTags: {
                        $push: "$allEventTags"
                    }
                }
            },
            {
                // flattens resulting 2d array of event tage, each subarray belonging to an entry into a 1d array of all event tag uses from
                $project: {
                    combinedEventTags: {
                        $reduce: {
                            input: "$combinedEventTags",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", "$$this"] }
                        }
                    }
                }
            },
        ])

        return eventTagFrequency
    }



}


export default Database