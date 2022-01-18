import mongoose from "mongoose";
import { IPage } from "./page.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

const Schema = mongoose.Schema;

const PageSchema = new Schema<IPage>({
  name: String,
  translationFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_NAMES.TRANSLATION_FILE,
    },
  ],
});

const PageModel = mongoose.model<IPage>(COLLECTION_NAMES.PAGE, PageSchema);

export { PageModel };
