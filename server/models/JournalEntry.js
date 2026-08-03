import mongoose from "mongoose";
import { journalEntrySchema } from "./journalEntrySchema.js";

const { model } = mongoose;

const JournalEntry = model("JournalEntry", journalEntrySchema);

export default JournalEntry;
