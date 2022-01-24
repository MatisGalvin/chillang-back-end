import mongoose from "mongoose";
import { Crossword } from "./crossword.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

const Schema = mongoose.Schema;

const CrosswordSchema = new Schema({
  data: [
    {
      clue: String,
      answer: String,
    },
  ],
});

const CrosswordModel = mongoose.model<{ data: Crossword[] }>(
  COLLECTION_NAMES.CROSSWORD,
  CrosswordSchema
);

CrosswordModel.create({});
export { CrosswordModel };
