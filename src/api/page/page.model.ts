import mongoose from "mongoose";
import { IPage, IPagePopulatedDoc } from "./page.typing";

const Schema = mongoose.Schema;

const PageSchema = new Schema<IPage>(
  {
    name: String,
    translationFiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "TranslationFile",
      },
    ],
  },
  { versionKey: false }
);

const PageModel = mongoose.model<IPage>("Page", PageSchema);

export { PageModel };
