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

// This get all journal entries
router.get("/journalentries", async (req, res) => {
    let journalentries

    try {
        journalentries = await db.getAllJournalEntries()
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

// route that create a new journal entry
router.post("/journalentries/new", async (req, res) => {

    try {
        let newEntry = await db.createEntry(req.body)
        res.status(201).json({ status: "success", payload: {message: "Successfully added entry to the bonfire!", newEntry : newEntry } })
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

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(404).json({
            status: "error",
            payload: "Entry not found"
        });
    }

});






export default router