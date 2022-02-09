import mongoose from "mongoose";
import { IProject } from "./project.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema<IProject>(
  {
    name: String,
    apiKey: String,
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAMES.PAGE,
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

const ProjectModel = mongoose.model<IProject>(
  COLLECTION_NAMES.PROJECT,
  ProjectSchema
);

export { ProjectModel };
