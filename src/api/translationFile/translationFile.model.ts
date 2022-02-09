import mongoose from "mongoose";
import { ITranslationFile } from "./translationFile.typing";

const Schema = mongoose.Schema;

const TranslationFileSchema = new Schema<ITranslationFile>(
  {
    lang: String,
    data: [
      {
        id: String,
        value: String,
        description: String,
      },
    ],
  },
  { versionKey: false }
);

const TranslationFileModel = mongoose.model<ITranslationFile>(
  "TranslationFile",
  TranslationFileSchema
);

export { TranslationFileModel };
