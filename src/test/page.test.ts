import supertest from "supertest";
import { Server } from "../server";
import { PageModel } from "../api/page/page.model";
import { IPage } from "../api/page/page.typing";

// We don't start the server, this way supertest start it itself on an available port
const server = new Server().getExpressInstance();

describe("Page API", () => {
  // Should return exactly two pages
  it("/pages (GET)", async () => {
    await PageModel.create({
      name: "Contact Page",
      translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
    });
    await PageModel.create({
      name: "Home Page",
      translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
    });

    const response = await supertest(server)
      .get("/pages")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect((response.body as IPage[])[0].name).toEqual("Contact Page");
    expect((response.body as IPage[])[1].name).toEqual("Home Page");
  });

  // Should return one page named Contact Page
  it("/page/:_id (GET)", async () => {
    const createdPage = await PageModel.create({
      name: "Contact Page",
      translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
    });

    const response = await supertest(server)
      .get("/page/" + createdPage._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IPage).name).toEqual("Contact Page");
    expect((response.body as IPage).translationFiles).toEqual([
      "61e6d2afbc63fbd022d3a8ac",
    ]);
    expect(typeof response.body._id).toBe("string");
  });

  // Should change the name of the page 'Contact Page' to 'About Page'
  it("/page/update/:_id (POST)", async () => {
    const createdPage = await PageModel.create({
      name: "Contact Page",
      translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
    });

    const response = await supertest(server)
      .post("/page/update/" + createdPage._id)
      .set("Accept", "application/json")
      .send({ page: { name: "About Page" } });

    expect(response.status).toEqual(200);
    expect((response.body as IPage).name).toEqual("About Page");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IPage).translationFiles).toEqual([
      "61e6d2afbc63fbd022d3a8ac",
    ]);
  });

  // Shoud delete one page named 'Contact Page'
  it("/page/delete/:_id (DELETE)", async () => {
    const createdPage = await PageModel.create({
      name: "Contact Page",
      translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
    });

    const response = await supertest(server)
      .delete("/page/delete/" + createdPage._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as IPage).name).toEqual("Contact Page");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IPage).translationFiles).toEqual([
      "61e6d2afbc63fbd022d3a8ac",
    ]);
  });

  // Should create a page named 'Shop Page'
  it("/page (POST)", async () => {
    const response = await supertest(server)
      .post("/page")
      .set("Accept", "application/json")
      .send({
        name: "Shop Page",
        translationFiles: ["61e6d2afbc63fbd022d3a8ac"],
      });

    expect(response.status).toEqual(200);
    expect((response.body as IPage).name).toEqual("Shop Page");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as IPage).translationFiles).toEqual([
      "61e6d2afbc63fbd022d3a8ac",
    ]);
  });
});
