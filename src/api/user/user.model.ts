import mongoose from "mongoose";
import { IUser } from "./user.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";
import "../project/project.model";
import "../page/page.model";
import "../translationFile/translationFile.model";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    username: String,
    encryptedPassword: String,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAMES.PROJECT,
      },
    ],
  },
  { versionKey: false }
);

const UserModel = mongoose.model<IUser>(COLLECTION_NAMES.USER, UserSchema);

export { UserModel };
