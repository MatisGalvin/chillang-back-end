import { TranslationFileService } from "./translationFile.service";
import { Express, Request, Response } from "express";

export class TranslationFileController {
  public listen(server: Express) {
    server.get("/translationFiles", this.readAll);
    server.post("/translationFile", this.create);
  }

  private async readAll(req: Request, res: Response) {
    const translationFiles = await TranslationFileService.readAll();
    res.send(translationFiles);
  }

  private async create(req: Request, res: Response) {
    const { lang } = req.body;
    const { data } = req.body;
    const translationFile = await TranslationFileService.create(lang, data);
    res.send(translationFile);
  }
}
