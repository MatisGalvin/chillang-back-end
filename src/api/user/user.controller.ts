import { UserService } from "./user.service";
import { Express, Request, Response } from "express";

export class UserController {
  public listen(server: Express) {
    server.get("/users", this.readAll);
    server.get("/user/:id", this.read);
    server.post("/user", this.create);
    server.post("/user/update/:id", this.update);
    server.delete("/user/delete/:id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const users = await UserService.readAll();
    res.send(users);
  }

  private async read(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.read(id);
    res.send(user);
  }

  private async create(req: Request, res: Response) {
    const { username } = req.body;
    const createdUser = await UserService.create(
      username,
    );
    res.send(createdUser);
  }

  private async update(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req.body;
    const updatedUser = await UserService.update(id, user);
    res.send(updatedUser);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await UserService.delete(id);
    res.send(deletedUser);
  }
}
