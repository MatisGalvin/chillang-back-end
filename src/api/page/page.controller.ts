import { PageService } from "./page.service";
import { Express, Request, Response } from "express";

export class PageController {
  public listen(server: Express) {
    server.get("/pages", this.readAll);
    server.post("/page", this.create);
    server.get("/page/:id", this.read);
    server.post("/page/update/:id", this.update);
    server.delete("/page/delete/:id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const pages = await PageService.readAll();
    res.send(pages);
  }

  private async create(req: Request, res: Response) {
    const name = req.body.name;
    const translationFiles = req.body.translationFiles;
    const createdPage = await PageService.create(name, translationFiles);
    res.send(createdPage);
  }

  private async read(req: Request, res: Response) {
    const { id } = req.params;
    const page = await PageService.read(id);
    res.send(page);
  }

  private async update(req: Request, res: Response) {
    const { id } = req.params;
    const { page } = req.body;
    const updatedPage = await PageService.update(id, page);
    res.send(updatedPage);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedPage = await PageService.delete(id);
    res.send(deletedPage);
  }
}
