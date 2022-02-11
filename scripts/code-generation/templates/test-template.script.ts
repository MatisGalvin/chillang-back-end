import { toPascalCase } from "../../utils.script";

export default (name: string) => {
  const namePascal = toPascalCase(name);
  return `import supertest from "supertest";
import { Server } from "../../server";
import { ${namePascal}Model } from "./${name}.model";
import { I${namePascal}Doc } from "./${name}.typing";

const server = new Server().getExpressInstance();
describe("${namePascal} API", () => {

  it("/${name} (GET)", async () => {
    await ${namePascal}Model.create({});
    const response = await supertest(server).get("/${name}").set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc[])[0]._id).toBeDefined()
  });

  it("/${name}/:_id (GET)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server).get("/${name}/" + created${namePascal}._id)
    .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name}/update/:_id (POST)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server)
      .post("/${name}/update/" + created${namePascal}._id)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name}/delete/:_id (DELETE)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server)
      .delete("/${name}/delete/" + created${namePascal}._id)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name} (POST)", async () => {
    const response = await supertest(server)
      .post("/${name}")
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined();
  });
});`;
};
