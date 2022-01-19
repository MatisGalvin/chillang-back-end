import { UserService } from "./user.service";
import { Express, Request, Response } from "express";

export class UserController {
  public listen(server: Express) {
    server.get("/users", this.readAll);
    server.get("/user/:id", this.read);
    server.post("/user", this.create);
  }

  private async readAll(req: Request, res: Response) {
    const users = await UserService.readAll();
    res.send(users);
  }

  private async read(req: Request, res: Response) {
    const id = req.params.id;
    const user = await UserService.read(id);
    res.send(user);
  }

  private async create(req: Request, res: Response) {
    const username = req.body.username;
    const encryptedPassword = req.body.encryptedPassword;
    const user = await UserService.create(username, encryptedPassword);
    await user.save();
    res.send(user);
  }
}
