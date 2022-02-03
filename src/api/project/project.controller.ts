import { ProjectService } from "./project.service";
import { Express, Request, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { IPage } from "../page/page.typing";
import { IProject } from "./project.typing";

export class ProjectController {
  public listen(server: Express) {
    server.get("/projects", this.readAll);
    server.post("/project", this.create);
    server.get("/project/:_id", this.read);
    server.post("/project/update/:_id", this.update);
    server.delete("/project/delete/:_id", this.delete);
  }

  private async create(
    req: Request<{}, {}, { name: string; apiKey: string; pages: string[] }>,
    res: Response
  ) {
    const { name, apiKey, pages } = req.body;
    const createdProject = await ProjectService.create(name, apiKey, pages);
    res.send(createdProject);
  }

  private async readAll(req: Request, res: Response) {
    const projects = await ProjectService.readAll();
    res.send(projects);
  }

  private async read(req: IReadRequest, res: Response) {
    const { _id } = req.params;
    const project = await ProjectService.read(_id);
    res.send(project);
  }

  private async update(
    req: Request<{ _id: string }, {}, { project: IProject }>,
    res: Response
  ) {
    const { _id } = req.params;
    const { project } = req.body;
    const updatedProject = await ProjectService.update(_id, project);
    res.send(updatedProject);
  }

  private async delete(req: IDeleteRequest, res: Response) {
    const { _id } = req.params;
    const deletedProject = await ProjectService.delete(_id);
    res.send(deletedProject);
  }
}
