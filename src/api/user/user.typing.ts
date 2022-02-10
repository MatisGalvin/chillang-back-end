import { IProjectPopulatedDoc } from "../project/project.typing";

export interface IUser {
  username: string;
  encryptedPassword: string;
  projects: string[];
}

export interface IUserDoc extends IUser {
  _id: string;
}

export interface IUserPopulatedDoc extends Omit<IUserDoc, "projects"> {
  projects: IProjectPopulatedDoc[];
}

export interface IUserCreateBody
  extends Pick<IUser, "username" | "encryptedPassword"> {}
