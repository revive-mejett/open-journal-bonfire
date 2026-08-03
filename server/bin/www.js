import { connectToDb } from "../db/conn.js";
import app from "../app.js";
import { startMidnightBurnedTrimJob } from "../jobs/midnightBurnedTrim.js";

const PORT = process.env.PORT || 5050;

(async () => {
    try {
        await connectToDb();
    } catch (error) {
        console.error("Error connecting to db --> " + error);
        process.exit(1);
    }

    startMidnightBurnedTrimJob();

    // start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})();
