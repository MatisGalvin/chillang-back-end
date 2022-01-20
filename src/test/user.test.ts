import mongoose from "mongoose";
import { serverConnect } from "../testing/server";
import { UserController } from "../api/user/user.controller";
import supertest from "supertest";
import { UserModel } from "../api/user/user.model";
import { IUser } from "../api/user/user.typing";

let server = serverConnect();

beforeEach((done) => {
  new UserController().listen(server);
  mongoose.connect("mongodb://localhost:27017/testDB", () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("GET /users", async () => {
  await UserModel.create({
    username: "test",
    encryptedPassword: "blablabla",
  });
  supertest(server)
    .get("/users")
    .expect(200)
    .then((users: any) => {
      expect(users[0].username).toEqual("test");
    });
});
