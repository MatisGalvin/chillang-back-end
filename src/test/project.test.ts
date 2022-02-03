import supertest from "supertest";
import { ProjectModel } from "../api/project/project.model";
import { IProject } from "../api/project/project.typing";
import { Server } from "../server";
// We don't start the server, this way supertest start it itself on an available port
const server = new Server().getExpressInstance();

describe("Project API", () => {
  // Should return exactly two projects
  it("/projects (GET)", async () => {
    await ProjectModel.create({
      name: "Test project",
      apiKey: "clebidon",
      pages: ["61e6d2afbc63fbd022d3a8ab"],
    });
    await ProjectModel.create({
      name: "Chill",
      apiKey: "oklm",
      pages: ["61e6d2afbc63fbd022d3a8ab"],
    });

    const response = await supertest(server)
      .get("/projects")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect((response.body as IProject[])[0].name).toEqual("Test project");
    expect((response.body as IProject[])[0].apiKey).toEqual("clebidon");
    expect((response.body as IProject[])[0].pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
    expect((response.body as IProject[])[1].name).toEqual("Chill");
    expect((response.body as IProject[])[1].apiKey).toEqual("oklm");
    expect((response.body as IProject[])[1].pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
  });

  // Should return one project named Pepouz
  it("/project/:_id (GET)", async () => {
    const createdProject = await ProjectModel.create({
      name: "Pepouz",
      apiKey: "oklm",
      pages: ["61e6d2afbc63fbd022d3a8ab"],
    });

    const response = await supertest(server)
      .get("/project/" + createdProject._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IProject).name).toEqual("Pepouz");
    expect((response.body as IProject).apiKey).toEqual("oklm");
    expect((response.body as IProject).pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
    expect(typeof response.body._id).toBe("string");
  });

  // Should change the name of the project Pepouz to PepouzSurLaPelouz
  it("/project/update/:_id (POST)", async () => {
    const createdProject = await ProjectModel.create({
      name: "Pepouz",
      apiKey: "oklm",
      pages: ["61e6d2afbc63fbd022d3a8ab"],
    });

    const response = await supertest(server)
      .post("/project/update/" + createdProject._id)
      .set("Accept", "application/json")
      .send({ project: { name: "PepouzSurLaPelouz" } });

    expect(response.status).toEqual(200);
    expect((response.body as IProject).name).toEqual("PepouzSurLaPelouz");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IProject).pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
  });

  // Should delete one project named 'JambonProject'
  it("/project/delete/:_id (DELETE)", async () => {
    const createdProject = await ProjectModel.create({
      name: "JambonProject",
      apiKey: "oklm",
      pages: ["61e6d2afbc63fbd022d3a8ab"],
    });

    const response = await supertest(server)
      .delete("/project/delete/" + createdProject._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IProject).name).toEqual("JambonProject");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IProject).pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
  });

  // Should create a project named 'JambonProject'
  it("/project (POST)", async () => {
    const response = await supertest(server)
      .post("/project")
      .set("Accept", "application/json")
      .send({
        name: "JambonProject",
        apiKey: "oklm",
        pages: ["61e6d2afbc63fbd022d3a8ab"],
      });

    expect(response.status).toEqual(200);
    expect((response.body as IProject).name).toEqual("JambonProject");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IProject).pages).toEqual([
      "61e6d2afbc63fbd022d3a8ab",
    ]);
  });
});
