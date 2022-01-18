// Appeller le model de user
import { UserModel } from "./user.model";

// readAll()
export const UserService = {
  readAll: async () => {
    const users = await UserModel.find({}).populate({
      path: "projects",
      populate: {
        path: "pages",
        populate: {
          path: "translationFiles",
        },
      },
    });

    return users;
  },
};
