import express from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import MatchEntry from "../models/MatchEntry.js";
import Database from "../db/conn.js";

const router = express.Router();
const collectionName =  "match-entries"
const db = new Database()

// This get all match entries
router.get("/matchentries", async (req, res) => {
  let collection = await db.getAllEntries()
  res.json(collection).status(200); // send success response
});

// retrieve a specific match journal entry given by id as url path param
router.get("/:id", async (req, res) => {
  let collection = await db.collection(collectionName);
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200); // send success response
});

export default router