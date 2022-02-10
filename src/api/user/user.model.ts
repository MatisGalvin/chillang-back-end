import mongoose from "mongoose";
import { IUser } from "./user.typing";
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
        ref: "Project",
      },
    ],
  },
  { versionKey: false }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { UserModel };
