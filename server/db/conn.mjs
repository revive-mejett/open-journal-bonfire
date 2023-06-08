import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";


let conn;

//try to connect to mongodb
try {
  conn = await mongoose.connect(connectionString)
} catch(e) {
  console.error(e);
}

let db = conn.db("match-journal-data");

export default db;