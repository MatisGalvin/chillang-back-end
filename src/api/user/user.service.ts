// Appeller le model de user
import { UserModel } from "./user.model";
import { IUser } from "./user.typing";

// readAll()
export const UserService = {
  readAll: async () => {
    const users = await UserModel.find({})

    return users;
  },

  read: async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  },

  create: async (
    username: string,
  ) => {
    const createdUser = await UserModel.create({
      username,
    });
    return createdUser;
  },

  update: async (id: string, user: IUser) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  },

  delete: async (id: string) => {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  },
};
