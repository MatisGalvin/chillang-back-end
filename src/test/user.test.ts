import mongoose from "mongoose";
import { UserController } from "../api/user/user.controller";
import supertest from "supertest";
import { UserModel } from "../api/user/user.model";
import { IUser } from "../api/user/user.typing";
import { serverConnect } from "../server/serverConnect";
import { portServer } from "../config/server.config";
import { connectLinkDb } from "../config/mongoose.config";

let server = serverConnect(portServer.test);

beforeAll((done) => {
  mongoose.connect(connectLinkDb.test, () => {
    new UserController().listen(server);
    done();
  });
});

beforeEach((done) => {
  mongoose.connection.db.dropDatabase(() => done());
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});

describe("GET /users", () => {
  it("should have exactly one user", async () => {
    await UserModel.create({
      username: "test",
      encryptedPassword: "blablabla",
    });

    const response = await supertest(server)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IUser[])[0].username).toEqual("test");
  });
});
