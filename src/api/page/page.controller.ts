import { PageService } from "./page.service";
import { Express, Request, Response } from "express";

export class PageController {
  public listen(server: Express) {
    server.get("/pages", this.readAll);
  }

  private async readAll(req: Request, res: Response) {
    const pages = await PageService.readAll();
    res.send(pages);
  }
}
