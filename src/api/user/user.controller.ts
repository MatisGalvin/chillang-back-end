import { UserService } from "./user.service";
import { Express, Request, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { IUser, IUserReadAll } from "./user.typing";
import { EX } from "./user.swagger";
import { Example, Get, Route, Tags } from "tsoa";

@Route("/users")
@Tags("Users")
export class UserController {
  @Get("/")
  // @Example<IUser[]>(EX.readAll)
  public async readAll(): Promise<IUser[]> {
    return await UserService.readAll();
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
