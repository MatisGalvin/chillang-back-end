import { ProjectService } from "./project.service";
import { Express, Request, Response } from "express";

export class ProjectController {
  public listen(server: Express) {
    server.get("/projects", this.readAll);
    server.post("/project", this.create);
    server.get("/project/:id", this.read);
  }

  private async create(req: Request, res: Response) {
    const name = req.body.name;
    const api_key = req.body.api_key;
    const pages = req.body.pages;
    const createdProject = await ProjectService.create(name, api_key, pages);
    await createdProject.save();
    res.send(createdProject);
  }

  private async readAll(req: Request, res: Response) {
    const projects = await ProjectService.readAll();
    res.send(projects);
  }

  private async read(req: Request, res: Response) {
    const { id } = req.params;
    const project = await ProjectService.read(id);
    res.send(project);
  }
}
