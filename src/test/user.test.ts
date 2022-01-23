import supertest from "supertest";
import mongoose from "mongoose";
import { UserModel } from "../api/user/user.model";
import { IUser } from "../api/user/user.typing";
import { mongooseConfig } from "../config/dev.config";
import { Server } from "../server";
// We don't start the server, this way supertest start it itself on an available port
const server = new Server().getExpressInstance();

describe("User API", () => {
  // Should return two users
  it("/users", async () => {
    await UserModel.create({
      username: "test",
    });
    await UserModel.create({
      username: "Jambon",
    });
    const response = await supertest(server)
      .get("/users")
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect((response.body as IUser[])[0].username).toEqual("test");
    expect((response.body as IUser[])[1].username).toEqual("Jambon");
    expect(1).toEqual(1);
  });

  // Should return one user named Jambon
  it("/user/:id (GET)", async () => {
    const createdUser = await UserModel.create({
      username: "Jambon",
    });

    const response = await supertest(server)
      .get("/user/" + createdUser._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("Jambon");
  });

  // Shoud update the username Jambon to JambonBlanc
  it("/user/update/:id (POST)", async () => {
    const createdUser = await UserModel.create({
      username: "Jambon",
    });

    const response = await supertest(server)
      .post("/user/update/" + createdUser._id)
      .set("Accept", "application/json")
      .send({ user: { username: "JambonBlanc" } });

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("JambonBlanc");
  });

  // Shoud delete one user with username Jambon
  it("/user/delete/:id (DELETE)", async () => {
    const createdUser = await UserModel.create({
      username: "Jambon",
      encryptedPassword: "parme",
    });

    const response = await supertest(server)
      .delete("/user/delete/" + createdUser._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("Jambon");
  });

  // Should create a user with username Matis
  it("/user (POST)", async () => {
    const response = await supertest(server)
      .post("/user")
      .set("Accept", "application/json")
      .send({ username: "Matis" });
    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("Matis");
    expect(typeof response.body._id).toBe("string");
  });
});
