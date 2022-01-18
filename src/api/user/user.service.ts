// Appeller le model de user
import path from "path/posix";
import { UserModel } from "./user.model";

// readAll()
export const UserService = {
  readAll: async () => {
    const users = await UserModel.find({}).populate("projects");

    return users;
  },
};
