// Appeller le model de user
import { UserModel } from "./user.model";
import { IUser } from "./user.typing";

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

  read: async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  },

  create: async (
    username: string,
    encryptedPassword: string,
    projects: string[]
  ) => {
    const user = new UserModel({
      username: username,
      encryptedPassword: encryptedPassword,
      projects: projects,
    });
    return user;
  },

  update: async (id: string, user: IUser) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  },
};
