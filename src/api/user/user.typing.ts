import { IProjectReadAll } from "../project/project.typing";

export interface IUser {
  username: string;
  encryptedPassword: string;
  projects: string[];
}

export interface IUserReadAll {
  _id: string;
  username: string;
  encryptedPassword: string;
  projects: IProjectReadAll[];
}
