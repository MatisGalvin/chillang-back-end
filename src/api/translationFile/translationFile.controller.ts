import { TranslationFileService } from "./translationFile.service";
import { Express, Request, Response } from "express";

export class TranslationFileController {
  public listen(server: Express) {
    server.get("/translationFiles", this.readAll);
    server.post("/translationFile", this.create);
    server.get("/translationFile/:id", this.read);
    server.post("/translationFile/update/:id", this.update);
    server.delete("/translationFile/delete/:id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const translationFiles = await TranslationFileService.readAll();
    res.send(translationFiles);
  }

  private async create(req: Request, res: Response) {
    const { lang, data } = req.body;
    const createdTranslationFile = await TranslationFileService.create(
      lang,
      data
    );
    res.send(createdTranslationFile);
  }

  private async read(req: Request, res: Response) {
    const { id } = req.params;
    const translationFile = await TranslationFileService.read(id);
    res.send(translationFile);
  }

  private async update(req: Request, res: Response) {
    const { id } = req.params;
    const { translationFile } = req.body;
    const updatedTranslationFile = await TranslationFileService.update(
      id,
      translationFile
    );
    res.send(updatedTranslationFile);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedTranslationFile = await TranslationFileService.delete(id);
    res.send(deletedTranslationFile);
  }
}
