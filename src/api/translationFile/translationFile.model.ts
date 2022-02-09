import mongoose from "mongoose";
import { ITranslationFile } from "./translationFile.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

const Schema = mongoose.Schema;

const TranslationFileSchema = new Schema<ITranslationFile>(
  {
    lang: String,
    data: [
      {
        _id: false,
        id: String,
        value: String,
        description: String,
      },
    ],
  },
  { versionKey: false }
);

const TranslationFileModel = mongoose.model<ITranslationFile>(
  COLLECTION_NAMES.TRANSLATION_FILE,
  TranslationFileSchema
);

export { TranslationFileModel };
