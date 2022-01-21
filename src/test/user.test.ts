import supertest from "supertest";
import mongoose from "mongoose";
import { UserController } from "../api/user/user.controller";
import { UserModel } from "../api/user/user.model";
import { IUser } from "../api/user/user.typing";
import { connectLinkDb } from "../config/mongoose.config";

const server = (process.env as any).JAMBON;

console.log("================  LOG SERVER ==================", process.env);

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

describe("/users (GET)", () => {
  // Should return two users
  it("", async () => {
    await UserModel.create({
      username: "test",
      encryptedPassword: "blablabla",
    });
    await UserModel.create({
      username: "Jambon",
      encryptedPassword: "cochonou",
    });

    const response = await supertest(server)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect((response.body as IUser[])[0].username).toEqual("test");
    expect((response.body as IUser[])[1].username).toEqual("Jambon");
  });
});

describe("/user/:id (GET)", () => {
  // Should return one user named Jambon
  it("", async () => {
    const createdUser = await UserModel.create({
      username: "Jambon",
      encryptedPassword: "parme",
    });

    const response = await supertest(server)
      .get("/user/" + createdUser._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("Jambon");
  });
});

describe("/user/update/:id (POST)", () => {
  // Shoud update the username Jambon to JambonBlanc
  it("", async () => {
    const createdUser = await UserModel.create({
      username: "Jambon",
      encryptedPassword: "parme",
    });

    const response = await supertest(server)
      .post("/user/update/" + createdUser._id)
      .set("Accept", "application/json")
      .send({ user: { username: "JambonBlanc" } });

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("JambonBlanc");
  });
});

describe("/user/delete/:id (DELETE)", () => {
  // Shoud delete one user with username Jambon
  it("", async () => {
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
});

describe("/user (POST)", () => {
  // Should create a user with username Matis
  it("", async () => {
    const response = await supertest(server)
      .post("/user")
      .set("Accept", "application/json")
      .send({ username: "Matis", encryptedPassword: "motdepasseduturfu" });

    expect(response.status).toEqual(200);
    expect((response.body as IUser).username).toEqual("Matis");
    expect((response.body as IUser).encryptedPassword).toEqual(
      "motdepasseduturfu"
    );
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IUser).projects.length).toEqual(0);
  });
});
