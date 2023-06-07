import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";


const client = new MongoClient(connectionString);

let conn;

//try to connect to mongodb
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("match-journal-data");

export default db;