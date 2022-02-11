import mongoose from "mongoose";
import { IJambono } from "./jambono.typing";

const Schema = mongoose.Schema;

const JambonoSchema = new Schema<IJambono>({}, { versionKey: false });

const JambonoModel = mongoose.model<IJambono>("Jambono", JambonoSchema);

export { JambonoModel };
