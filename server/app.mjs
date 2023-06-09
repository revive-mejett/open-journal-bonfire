import express from "express";
// import cors from "cors";

import "./loadEnvironment.mjs";
import records from "./routes/matchEntries.mjs";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api", records);




export default app;