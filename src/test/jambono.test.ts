import supertest from "supertest";
import { Server } from "../server";
import { JambonoModel } from "../api/jambono/jambono.model";
import { IJambono, IJambonoDoc } from "../api/jambono/jambono.typing";

const server = new Server().getExpressInstance();
describe("Jambono API", () => {

  it("/jambono (GET)", async () => {
    await JambonoModel.create({});
    const response = await supertest(server).get("/jambono").set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IJambonoDoc[])[0]._id).toBeDefined()
  });

  it("/jambono/:_id (GET)", async () => {
    const createdJambono = await JambonoModel.create({});
    const response = await supertest(server).get("/jambono/" + createdJambono._id)
    .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IJambonoDoc)._id).toBeDefined()
  });
  
  it("/jambono/update/:_id (POST)", async () => {
    const createdJambono = await JambonoModel.create({});
    const response = await supertest(server)
      .post("/jambono/update/" + createdJambono._id)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as IJambonoDoc)._id).toBeDefined()
  });
  
  it("/jambono/delete/:_id (DELETE)", async () => {
    const createdJambono = await JambonoModel.create({});
    const response = await supertest(server)
      .delete("/jambono/delete/" + createdJambono._id)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IJambonoDoc)._id).toBeDefined()
  });
  
  it("/jambono (POST)", async () => {
    const response = await supertest(server)
      .post("/jambono")
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as IJambonoDoc)._id).toBeDefined();
  });
});
