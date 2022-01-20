import { ProjectService } from "./project.service";
import { Express, Request, Response } from "express";

export class ProjectController {
  public listen(server: Express) {
    server.get("/projects", this.readAll);
    server.post("/project", this.create);
    server.get("/project/:id", this.read);
    server.post("/project/update/:id", this.update);
    server.delete("/project/delete/:id", this.delete);
  }

  private async create(req: Request, res: Response) {
    const name = req.body.name;
    const apiKey = req.body.apiKey;
    const pages = req.body.pages;
    const createdProject = await ProjectService.create(name, apiKey, pages);
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

  private async update(req: Request, res: Response) {
    const { id } = req.params;
    const { project } = req.body;
    const updatedProject = await ProjectService.update(id, project);
    res.send(updatedProject);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedProject = await ProjectService.delete(id);
    res.send(deletedProject);
  }
}
