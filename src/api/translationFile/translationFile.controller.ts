import { TranslationFileService } from "./translationFile.service";
import { Express, Request, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { ITranslationFile } from "./translationFile.typing";

export class TranslationFileController {
  public listen(server: Express) {
    server.get("/translationFiles", this.readAll);
    server.post("/translationFile", this.create);
    server.get("/translationFile/:_id", this.read);
    server.post("/translationFile/update/:_id", this.update);
    server.delete("/translationFile/delete/:_id", this.delete);
  }

  /**
   * @swagger
   * /translationFiles:
   *  get:
   *    description: Get all translation files
   *    responses:
   *      200:
   *        description: Success
   */
  private async readAll(req: Request, res: Response) {
    const translationFiles = await TranslationFileService.readAll();
    res.send(translationFiles);
  }

  /**
   * @swagger
   * /translationFiles:
   *  post:
   *    description: Create a new translation file
   *    parameters:
   *    - name: body
   *      description: language for this translation file
   *      in: body
   *      required: true
   *      schema:
   *        type: object
   *        properties:
   *          lang:
   *            type: string
   *            example: FR
   *          data:
   *            type: array
   *            items:
   *              type: object
   *              properties:
   *                id:
   *                  type: string
   *                  example: hello
   *                value:
   *                  type: string
   *                  example: Hello les boys
   *                description:
   *                  type: string
   *                  example: Une petite description oklm
   *    responses:
   *       200:
   *         description: A single translation files.
   *
   */
  private async create(
    req: Request<{}, {}, { lang: string; data: string[] }>,
    res: Response
  ) {
    const { lang, data } = req.body;
    const createdTranslationFile = await TranslationFileService.create(
      lang,
      data
    );
    res.send(createdTranslationFile);
  }

  private async read(req: IReadRequest, res: Response) {
    const { _id } = req.params;
    const translationFile = await TranslationFileService.read(_id);
    res.send(translationFile);
  }

  private async update(
    req: Request<{ _id: string }, {}, { translationFile: ITranslationFile }>,
    res: Response
  ) {
    const { _id } = req.params;
    const { translationFile } = req.body;
    const updatedTranslationFile = await TranslationFileService.update(
      _id,
      translationFile
    );
    res.send(updatedTranslationFile);
  }

  private async delete(req: IDeleteRequest, res: Response) {
    const { _id } = req.params;
    const deletedTranslationFile = await TranslationFileService.delete(_id);
    res.send(deletedTranslationFile);
  }
}
