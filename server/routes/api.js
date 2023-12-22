import express from "express";
//import { ObjectId } from "mongodb";
import Database from "../db/conn.js";

const router = express.Router();
//const collectionName = "match-entries"
const db = new Database()

// This get all match entries
router.get("/matchentries", async (req, res) => {
    let matchentries

    try {
        matchentries = await db.getAllEntries()
        res.json(matchentries).status(200)
    } catch (error) {
        //send server error
        res.status(500).json({
            status: "error",
            payload: "Failed to retrieve all match entries from the database"
        })
    }

});

// This get all journal entries (or filtered entries if query params given)
router.get("/journalentries", async (req, res) => {
    let journalentries
    try {
        if (Object.keys(req.query).length !== 0) {
            let filterOptions = {
                titleFilterMatch: req.query.titleFilterMatch,
                entryContentMatch: req.query.entryContentMatch,
                minSelfRating: Number(req.query.minSelfRating),
                maxSelfRating: Number(req.query.maxSelfRating)
            }
            let sortOrder = req.query.sortOrder
            journalentries = await db.getFilteredJournalEntries(filterOptions, sortOrder)
        } else {
            journalentries = await db.getAllJournalEntries()
        }
        res.json(journalentries).status(200)
    } catch (error) {
        //send server error
        res.status(500).json({
            status: "error",
            payload: "Failed to retrieve all match entries from the database"
        })
    }
});

router.get("/journalentries/random", async (req, res) => {
    let result = await db.getRandomJournalEntry()

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(404).json({
            status: "error",
            payload: "Entry not found"
        });
    }
});

router.get("/journalentries/sample/:count", async (req, res) => {

    try {
        let result = await db.getSampleJournalEntries(Number(req.params.count))
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                status: "error",
                payload: "Entry not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            payload: "Failed to fetch sample journal entries"
        })
    }
    
});

// route that create a new journal entry
router.post("/journalentries/new", async (req, res) => {

    try {
        let newEntry = await db.createEntry(req.body)
        res.status(201).json({ status: "success", payload: {message: "akshan success", newEntry : newEntry } })
    } catch (error) {
        //send server error
        res.status(500).json({
            status: "error",
            payload: "Failed to add new entry"
        })
    }
})


// retrieve a specific journal entry given by id as url path param
router.get("/journalentries/:id", async (req, res) => {
    let result = await db.getJournalEntryById(req.params.id)
    try {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                status: "error",
                payload: "Entry not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            payload: "Failed to view entry"
        })
    }
});

//api routes for getting all frequent event tags
router.get("/frequent-event-tags", async (req, res) => {

    let eventTagsData = {
        greatEvents : [],
        neutralEvents : [],
        badEvents : []
    }

    try {
        let ellis = await Promise.all([db.getEventTags("positive"), db.getEventTags("neutral"), db.getEventTags("negative")])

        eventTagsData = {
            positiveTags : ellis[0],
            neutralTags : ellis[1],
            negativeTags : ellis[2],
        }

        res.status(200).json(eventTagsData)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: "error",
            payload: "Failed to fetch event tags"
        })
    }
})

//statistics bonfire data api routes

router.get("/stats/general", async (req, res) => {
    try {
        let allEntries = await db.getAllJournalEntries()

        if (allEntries.length === 0) {
            res.status(200).json({
                totalEntries: 0,
                positiveSelfRatedCount : 0,
                neutralSelfRatedCount: 0,
                negativeSelfRatedCount: 0,
                percentagePositive: 0,
                percentageNeutral: 0,
                percentageNegative: 0,
                averageWordCount: 0,
                numberEyeGlaring: 0,
                numberEyeUnsafe: 0,
                numberUnreadable: 0
            })
        } else {
            let positiveSelfRatedCount = await db.getSelfRatedCountByType(1)
            let neutralSelfRatedCount = await db.getSelfRatedCountByType(0)
            let negativeSelfRatedCount = await db.getSelfRatedCountByType(-1)

            positiveSelfRatedCount = positiveSelfRatedCount ? positiveSelfRatedCount.count : 0
            neutralSelfRatedCount = neutralSelfRatedCount ? neutralSelfRatedCount.count : 0
            negativeSelfRatedCount = negativeSelfRatedCount ? negativeSelfRatedCount.count : 0


            let totalEntries = positiveSelfRatedCount + neutralSelfRatedCount + negativeSelfRatedCount
            let percentagePositive = Math.round(positiveSelfRatedCount / totalEntries * 100)
            let percentageNegative  = Math.round(negativeSelfRatedCount / totalEntries * 100)
            let percentageNeutral = 100 - percentagePositive - percentageNegative

            let averageWordCount = await db.getAverageWordCount()
            averageWordCount = averageWordCount[0].averageWordCount

            let numberEyeGlaring = await db.getEyeGlaringEntryCount()
            let numberEyeUnsafe = await db.getExplicitEntryCount()
            let numberUnreadable = await db.getTooExplicitEntryCount()

            res.status(200).json({
                totalEntries: totalEntries,
                positiveSelfRatedCount : positiveSelfRatedCount,
                neutralSelfRatedCount: neutralSelfRatedCount,
                negativeSelfRatedCount: negativeSelfRatedCount,
                percentagePositive: percentagePositive,
                percentageNeutral: percentageNeutral,
                percentageNegative: percentageNegative,
                averageWordCount: averageWordCount,
                numberEyeGlaring: numberEyeGlaring,
                numberEyeUnsafe: numberEyeUnsafe,
                numberUnreadable: numberUnreadable
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: "error",
            payload: "Failed to fetch statistics (general stats)"
        })
    }
})

router.get("/stats/self-rating-distribution", async (req, res) => {

    try {
        let rawDistribution = await db.getSelfRatingDistribution()

        //include ratings values where the number of entries are 0
        //since the db aggregation only finds and groups each self-rating if it has at least 1 entry with that rating
        //ex: if no entries in the sample are rated 7, it's not listed part of the distribution after aggregation
        //here I manually include them.

        let distribution = [
            ...rawDistribution
        ]

        //finds any self-rating value from -10 to 10 (possible range of self rating values) if it's not listed in the raw distribution
        //adds any missing, setting numberEntries to 0
        for (let i = -10; i <= 10; i++) {
            if (!rawDistribution.find(selfRating => selfRating.rating === i)) {
                distribution.push({rating: i, numberEntries: 0})
            }
        }
        res.status(200).json(distribution)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: "error",
            payload: "Failed to fetch statistics (self-rating distribution stats)"
        })
    }
})


router.get("/stats/event-tag-usage-frequency", async (req, res) => {

    try {
        let rawData = await db.getEventTagUsageFrequency()

        if (rawData.length === 0) {
            res.status(200).json({
                eventTagFrequency: rawData
            })
        } else {

            //fill a frequency map of event tag keywords, how many occurences of each keyword
            let eventTagMap = new Map()
            rawData[0].combinedEventTags.forEach(eventTag => {
                if (eventTagMap.get(eventTag.keyword) !== undefined) {
                    eventTagMap.set(eventTag.keyword, {frequency: eventTagMap.get(eventTag.keyword).frequency + 1, weight: eventTag.weight})
                } else {
                    eventTagMap.set(eventTag.keyword, {frequency: 1, weight: eventTag.weight})
                }
            })

            //convert map to array and sort keywords alphabetically
            let eventTagArray = Array.from(eventTagMap)
            eventTagArray = eventTagArray.sort((a, b) => a[0].localeCompare(b[0]))

            res.status(200).json({
                date: rawData[0]._id,
                eventTagFrequency: eventTagArray
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: "error",
            payload: "Failed to fetch statistics (self-rating distribution stats)"
        })
    }
})

export default router