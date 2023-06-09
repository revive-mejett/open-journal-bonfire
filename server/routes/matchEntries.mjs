import express from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import MatchEntry from "../models/MatchEntry.mjs";

const router = express.Router();
const collectionName =  "match-entries"

// This get all match entries
router.get("/", async (req, res) => {
  let collection = await db.collection(collectionName);
  let results = await collection.find({}).toArray();
  res.send(results).status(200); // send success response
});


export default router