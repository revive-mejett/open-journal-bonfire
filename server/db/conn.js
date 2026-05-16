import mongoose from "mongoose";

/**
 * connect to MongoDB
 */
export async function connectToDb() {
    console.log("Connecting to MongoDB");
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to MongoDB");
}

/**
 * disconnect from MongoDB
 */
export async function disconnectFromDb() {
    await mongoose.connection.close();
}
