import { ProjectService } from "./project.service";
import { Express, Request, Response } from "express";

export class ProjectController {
  public listen(server: Express) {
    server.get("/projects", this.readAll);
    server.post("/project", this.create);
  }

  private async readAll(req: Request, res: Response) {
    const projects = await ProjectService.readAll();
    res.send(projects);
  }

  private async create(req: Request, res: Response) {
    const name = req.body.name;
    const api_key = req.body.api_key;
    const pages = req.body.pages;
    const createdProject = await ProjectService.create(name, api_key, pages);
    await createdProject.save();
    res.send(createdProject);
  }
}
