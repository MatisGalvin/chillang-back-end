import supertest from "supertest";
import { Server } from "../server";
import { TranslationFileModel } from "../api/translationFile/translationFile.model";
import { ITranslationFile } from "../api/translationFile/translationFile.typing";

// We don't start the server, this way supertest start it itself on an available port
const server = new Server().getExpressInstance();

describe("TranslationFile API", () => {
  // Should return exactly two translationFiles
  it("/translationFiles (GET)", async () => {
    await TranslationFileModel.create({
      lang: "fr",
      data: [
        {
          id: "title",
          value: "Bienvenue mon jambon",
        },
      ],
    });
    await TranslationFileModel.create({
      lang: "en",
      data: [
        {
          id: "title",
          value: "Welcome my ham",
        },
      ],
    });

    const response = await supertest(server)
      .get("/translationFiles")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect((response.body as ITranslationFile[])[0].lang).toEqual("fr");
    expect((response.body as ITranslationFile[])[0].data[0].id).toEqual(
      "title"
    );
    expect((response.body as ITranslationFile[])[0].data[0].value).toEqual(
      "Bienvenue mon jambon"
    );

    expect((response.body as ITranslationFile[])[1].lang).toEqual("en");
    expect((response.body as ITranslationFile[])[1].data[0].id).toEqual(
      "title"
    );
    expect((response.body as ITranslationFile[])[1].data[0].value).toEqual(
      "Welcome my ham"
    );
  });

  // Should return one translationFile with lang : fr and data : id "title" value: "Bien le bonjour"
  it("/translationFile/:id (GET)", async () => {
    const createdTranslationFile = await TranslationFileModel.create({
      lang: "fr",
      data: [
        {
          id: "title",
          value: "Bien le bonjour",
        },
      ],
    });

    const response = await supertest(server)
      .get("/translationFile/" + createdTranslationFile._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as ITranslationFile).lang).toEqual("fr");
    expect((response.body as ITranslationFile).data[0].id).toEqual("title");
    expect((response.body as ITranslationFile).data[0].value).toEqual(
      "Bien le bonjour"
    );
  });

  // Should change the vaue of the translationFile lang : fr and data : id "title" value: "Bien le bonjour" into value: "Voila les nouvelles"
  it("/translationFile/update/:id (POST)", async () => {
    const createdTranslationFile = await TranslationFileModel.create({
      lang: "fr",
      data: [
        {
          id: "title",
          value: "Bien le bonjour",
        },
      ],
    });

    const response = await supertest(server)
      .post("/translationFile/update/" + createdTranslationFile._id)
      .set("Accept", "application/json")
      .send({
        translationFile: {
          lang: "fr",
          data: [
            {
              id: "title",
              value: "Voila les nouvelles",
            },
          ],
        },
      });

    expect(response.status).toEqual(200);
    expect((response.body as ITranslationFile).lang).toEqual("fr");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as ITranslationFile).data[0].id).toEqual("title");
    expect((response.body as ITranslationFile).data[0].value).toEqual(
      "Voila les nouvelles"
    );
  });

  // Should delete one translationFile lang : fr and data : id "title" value: "Bien le bonjour"
  it("/translationFile/delete/:id (DELETE)", async () => {
    const createdTranslationFile = await TranslationFileModel.create({
      lang: "fr",
      data: [
        {
          id: "title",
          value: "Bien le bonjour",
        },
      ],
    });

    const response = await supertest(server)
      .delete("/translationFile/delete/" + createdTranslationFile._id)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect((response.body as ITranslationFile).lang).toEqual("fr");
    expect((response.body as ITranslationFile).data[0].id).toEqual("title");
    expect((response.body as ITranslationFile).data[0].value).toEqual(
      "Bien le bonjour"
    );
  });

  // Should create a new translationFile lang : fr and data : id "title" value: "Bien le bonjour mon jambon"
  it("/translationFile (POST)", async () => {
    const response = await supertest(server)
      .post("/translationFile")
      .set("Accept", "application/json")
      .send({
        lang: "fr",
        data: [
          {
            id: "title",
            value: "Bien le bonjour mon jambon",
          },
        ],
      });

    expect(response.status).toEqual(200);
    expect((response.body as ITranslationFile).lang).toEqual("fr");
    expect(typeof response.body._id).toBe("string");
    expect((response.body as ITranslationFile).data[0].id).toEqual("title");
    expect((response.body as ITranslationFile).data[0].value).toEqual(
      "Bien le bonjour mon jambon"
    );
  });
});
