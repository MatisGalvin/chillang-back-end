import { TranslationFileService } from "./translationFile.service";
import { Express, Request, Response } from "express";

export class TranslationFileController {
  public listen(server: Express) {
    server.get("/translationFiles", this.readAll);
  }

  private async readAll(req: Request, res: Response) {
    const translationFiles = await TranslationFileService.readAll();
    res.send(translationFiles);
  }
}
