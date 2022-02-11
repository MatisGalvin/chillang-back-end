import { JambonoService } from "./jambono.service";
import { IJambono, IJambonoDoc } from "./jambono.typing";
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Route,
  Tags,
} from "tsoa";
import { EX } from "./jambono.swagger";

@Route("/jambono")
@Tags("Jambono")
export class JambonoController extends Controller {
  @Get("/")
  @Example<IJambonoDoc[]>(EX.readAll)
  public async readAll(): Promise<IJambonoDoc[]> {
    return await JambonoService.readAll();
  }

  @Post("/")
  @Example<IJambonoDoc>(EX.create)
  public async create(
    @Body() body: IJambono
  ): Promise<IJambonoDoc> {
    return await JambonoService.create(body);
  }

  @Get("/{_id}")
  @Example<IJambonoDoc>(EX.read)
  public async read(@Path() _id: string): Promise<IJambonoDoc> {
    return await JambonoService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<IJambonoDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<IJambono>
  ): Promise<IJambonoDoc> {
    return await JambonoService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<IJambonoDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<IJambonoDoc> {
    return await JambonoService.delete(_id);
  }
}
