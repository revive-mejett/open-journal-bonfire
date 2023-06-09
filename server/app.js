import express from "express";
// import cors from "cors";

import "./loadEnvironment.js";
import records from "./routes/api.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api", records);




export default app;