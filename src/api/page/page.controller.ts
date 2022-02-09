import { PageService } from "./page.service";
import { IPage, IPageDoc, IPageRead } from "./page.typing";
import { Body, Delete, Example, Get, Path, Post, Route, Tags } from "tsoa";
import { EX } from "./page.swagger";

@Route("/pages")
@Tags("Page")
export class PageController {
  @Get("/")
  @Example<IPageDoc[]>(EX.readAll)
  public async readAll(): Promise<IPageDoc[]> {
    return await PageService.readAll();
  }

  @Post("/")
  @Example<IPageDoc>(EX.create)
  public async create(@Body() body: IPage): Promise<IPageDoc> {
    return await PageService.create(body);
  }

  @Get("/{_id}")
  @Example<IPageRead>(EX.read)
  public async read(@Path() _id: string): Promise<IPageRead> {
    return await PageService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<IPageDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: IPage
  ): Promise<IPageDoc> {
    return await PageService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<IPageDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<IPageDoc> {
    return await PageService.delete(_id);
  }
}
