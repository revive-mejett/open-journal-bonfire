import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const collectionName =  "match-entries"

// This get all match entries
router.get("/", async (req, res) => {
  let collection = await db.collection(collectionName);
  let results = await collection.find({}).toArray();
  res.send(results).status(200); // send success response
});

router.get("/test", async (req, res) => {

  res.send("hello node").status(200); // send success response
});


// retrieve a specific match journal entry given by id as url path param
router.get("/:id", async (req, res) => {
  let collection = await db.collection(collectionName);
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200); // send success response
});

// create a new journal entry
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection = await db.collection(collectionName);
  let result = await collection.insertOne(newDocument);
  res.send(result).status(201); // send 201 response (success CREATED)
});


// deletes a match entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection(collectionName);
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200); //send success response
  });

export default router