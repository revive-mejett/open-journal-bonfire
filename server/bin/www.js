import Database from "../db/conn.js";
import app from "../app.js";
const PORT = process.env.PORT || 5050;



(async () => {
    const db = new Database()
    try {
        await db.connectToDb()
        await db.createTestEntry()
    } catch(error) {
        console.error("Error connecting to db --> " + error)
        process.exit(1)
    }

    
    // start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})()
