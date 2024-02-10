import express from "express";
import path from "path"
// import cors from "cors";

import "./loadEnvironment.js";
import records from "./routes/api.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api", records);


const BUILD_DIR = "client/build"
app.use(express.static(BUILD_DIR))
// Redirect to index.html for the react router to handle
app.get('*', (req, res) => res.sendFile(path.resolve(BUILD_DIR, 'index.html')));

export default app;