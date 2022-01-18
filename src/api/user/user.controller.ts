import { UserService } from "./user.service";
import { Express, Request, Response } from "express";

// export const UserController = {

//   readAll: async (req: Request, res: Response) => {
//     const users = await UserService.readAll();
//     res.send(users);
//   },
// };

export class UserController {
  public listen(server: Express) {
    server.get("/users", this.readAll);
  }

  private async readAll(req: Request, res: Response) {
    const users = await UserService.readAll();
    res.send(users);
  }
}
