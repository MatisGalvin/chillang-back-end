import mongoose from "mongoose";
import { IUser } from "./user.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
  username: String,
});

const UserModel = mongoose.model<IUser>(COLLECTION_NAMES.USER, UserSchema);

export { UserModel };
