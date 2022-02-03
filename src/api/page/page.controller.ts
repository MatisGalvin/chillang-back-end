import { PageService } from "./page.service";
import { Express, Request, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { IPage } from "./page.typing";
import { ITranslationFile } from "../translationFile/translationFile.typing";

export class PageController {
  public listen(server: Express) {
    server.get("/pages", this.readAll);
    server.post("/page", this.create);
    server.get("/page/:_id", this.read);
    server.post("/page/update/:_id", this.update);
    server.delete("/page/delete/:_id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const pages = await PageService.readAll();
    res.send(pages);
  }

  private async create(
    req: Request<{}, {}, { name: string; translationFiles: string[] }>,
    res: Response
  ) {
    const { name, translationFiles } = req.body;
    const createdPage = await PageService.create(name, translationFiles);
    res.send(createdPage);
  }

  private async read(req: IReadRequest, res: Response) {
    const { _id } = req.params;
    const page = await PageService.read(_id);
    res.send(page);
  }

  private async update(
    req: Request<{ _id: string }, {}, { page: IPage }>,
    res: Response
  ) {
    const { _id } = req.params;
    const { page } = req.body;
    const updatedPage = await PageService.update(_id, page);
    res.send(updatedPage);
  }

  private async delete(req: IDeleteRequest, res: Response) {
    const { _id } = req.params;
    const deletedPage = await PageService.delete(_id);
    res.send(deletedPage);
  }
}
