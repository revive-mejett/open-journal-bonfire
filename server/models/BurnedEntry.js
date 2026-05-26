import mongoose from "mongoose";
import { journalEntrySchema } from "./journalEntrySchema.js";

const { model } = mongoose;

const BurnedEntry = model("BurnedEntry", journalEntrySchema, "BurnedEntries");

export default BurnedEntry;
