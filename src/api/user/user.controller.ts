import { UserService } from "./user.service";
import { Express, Request, Response } from "express";
import { EX } from "./user.swagger";
import { Example, Get, Route, Tags, Path, Body, Post, Delete } from "tsoa";
import {
  IUser,
  IUserCreateBody,
  IUserDoc,
  IUserPopulatedDoc,
} from "./user.typing";

@Route("/users")
@Tags("Users")
export class UserController {
  @Get("/")
  @Example<IUserPopulatedDoc[]>(EX.readAll)
  public async readAll(): Promise<IUserPopulatedDoc[]> {
    return await UserService.readAll();
  }

  @Post("/")
  @Example<IUser>(EX.create)
  public async create(@Body() body: IUserCreateBody): Promise<IUser> {
    return await UserService.create(body);
  }

  @Get("/{_id}")
  @Example<IUserPopulatedDoc>(EX.read)
  public async read(@Path() _id: string): Promise<IUserPopulatedDoc> {
    return await UserService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<IUserDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<IUser>
  ): Promise<IUserDoc> {
    return await UserService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<IUserDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<IUserDoc> {
    return await UserService.delete(_id);
  }
}
