// Appeller le model de user
import { IPage, IPageDoc } from "../page/page.typing";
import { IProjectDoc, IProjectPopulatedDoc } from "../project/project.typing";
import { UserModel } from "./user.model";
import { IUser, IUserCreateBody, IUserDoc } from "./user.typing";

// readAll()
export const UserService = {
  readAll: async () => {
    const users = await UserModel.find({}).populate<{
      projects: IProjectPopulatedDoc[];
    }>({
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
    const user = await UserModel.findById(id).populate<{
      projects: IProjectPopulatedDoc[];
    }>({
      path: "projects",
      populate: {
        path: "pages",
        populate: {
          path: "translationFiles",
        },
      },
    });
    return user;
  },

  create: async (body: IUserCreateBody) => {
    const createdUser = await UserModel.create({
      username: body.username,
      encryptedPassword: body.encryptedPassword,
      projects: [],
    });
    return createdUser;
  },

  update: async (id: string, user: Partial<IUser>) => {
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
