import { UserService } from "./user.service";
import { Express, Request, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { IUser } from "./user.typing";

export class UserController {
  public listen(server: Express) {
    server.get("/users", this.readAll);
    server.get("/user/:_id", this.read);
    server.post("/user", this.create);
    server.post("/user/update/:_id", this.update);
    server.delete("/user/delete/:_id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const users = await UserService.readAll();
    res.send(users);
  }

  private async read(req: IReadRequest, res: Response) {
    const { _id } = req.params;
    const user = await UserService.read(_id);
    res.send(user);
  }

  private async create(
    req: Request<
      {},
      {},
      { username: string; encryptedPassword: string; projects: string[] }
    >,
    res: Response
  ) {
    const { username, encryptedPassword, projects } = req.body;
    const createdUser = await UserService.create(
      username,
      encryptedPassword,
      projects
    );
    res.send(createdUser);
  }

  private async update(
    req: Request<{ _id: string }, {}, { user: IUser }>,
    res: Response
  ) {
    const { _id } = req.params;
    const { user } = req.body;
    const updatedUser = await UserService.update(_id, user);
    res.send(updatedUser);
  }

  private async delete(req: IDeleteRequest, res: Response) {
    const { _id } = req.params;
    const deletedUser = await UserService.delete(_id);
    res.send(deletedUser);
  }
}
