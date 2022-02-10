import { PageService } from "./page.service";
import { IPage, IPageDoc, IPagePopulatedDoc } from "./page.typing";
import { Body, Delete, Example, Get, Path, Post, Route, Tags } from "tsoa";
import { EX } from "./page.swagger";

@Route("/pages")
@Tags("Page")
export class PageController {
  @Get("/")
  @Example<IPage[]>(EX.readAll)
  public async readAll(): Promise<IPage[]> {
    return await PageService.readAll();
  }

  @Post("/")
  @Example<IPage>(EX.create)
  public async create(@Body() body: IPage): Promise<IPage> {
    return await PageService.create(body);
  }

  @Get("/{_id}")
  @Example<IPagePopulatedDoc>(EX.read)
  public async read(@Path() _id: string): Promise<IPagePopulatedDoc> {
    return await PageService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<IPage>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<IPage>
  ): Promise<IPage> {
    return await PageService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<IPage>(EX.delete)
  public async delete(@Path() _id: string): Promise<IPage> {
    return await PageService.delete(_id);
  }
}
