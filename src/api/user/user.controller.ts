import { UserService } from "./user.service";
import { Request, Response } from "express";

export const UserController = {
  readAll: async (req: Request, res: Response) => {
    const users = await UserService.readAll();
    res.send(users);
  },
};
