import { ProjectService } from "./project.service";
import { Express, Request, Response } from "express";

export class ProjectController {
  public listen(server: Express) {
    server.get("/projects", this.readAll);
  }

  private async readAll(req: Request, res: Response) {
    const projects = await ProjectService.readAll();
    res.send(projects);
  }

  // readAllPages
}
