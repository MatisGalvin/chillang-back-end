import { ProjectService } from "./project.service";
import { IProject, IProjectDoc } from "./project.typing";
import { Body, Delete, Example, Get, Path, Post, Route, Tags } from "tsoa";
import { EX } from "./project.swagger";

@Route("/projects")
@Tags("Projects")
export class ProjectController {
  @Get("/")
  @Example<IProjectDoc[]>(EX.readAll)
  public async readAll(): Promise<IProjectDoc[]> {
    return await ProjectService.readAll();
  }

  @Post("/")
  @Example<IProjectDoc>(EX.create)
  public async create(@Body() body: IProject): Promise<IProjectDoc> {
    return await ProjectService.create(body);
  }

  @Get("/{_id}")
  @Example<IProjectDoc>(EX.read)
  public async read(@Path() _id: string): Promise<IProjectDoc> {
    return await ProjectService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<IProjectDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<IProject>
  ): Promise<IProjectDoc> {
    return await ProjectService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<IProjectDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<IProjectDoc> {
    return await ProjectService.delete(_id);
  }
}
