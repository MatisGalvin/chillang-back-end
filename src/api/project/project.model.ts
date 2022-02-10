import mongoose from "mongoose";
import { IProject } from "./project.typing";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema<IProject>(
  {
    name: String,
    apiKey: String,
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Page",
      },
    ],
    supportedLanguages: [
      {
        _id: false,
        name: String,
        code: String,
      },
    ],
  },
  { versionKey: false }
);

const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);

export { ProjectModel };
