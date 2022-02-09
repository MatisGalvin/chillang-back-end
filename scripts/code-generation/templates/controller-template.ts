import { toPascalCase } from "../utils";
export const controllerTemplate = (name: string) => {
  const namePascal = toPascalCase(name);
  return `import { ${namePascal}Service } from "./${name}.service";
import { I${namePascal}, I${namePascal}Doc } from "./${name}.typing";
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
import { EX } from "./${name}.swagger";

@Route("/${name}s")
@Tags("Translation Files")
export class ${namePascal}Controller extends Controller {
  @Get("/")
  @Example<I${namePascal}Doc[]>(EX.readAll)
  public async readAll(): Promise<I${namePascal}Doc[]> {
    return await ${namePascal}Service.readAll();
  }

  @Post("/")
  @Example<I${namePascal}Doc>(EX.create)
  public async create(
    @Body() body: I${namePascal}
  ): Promise<I${namePascal}Doc> {
    return await ${namePascal}Service.create(body);
  }

  @Get("/{_id}")
  @Example<I${namePascal}Doc>(EX.read)
  public async read(@Path() _id: string): Promise<I${namePascal}Doc> {
    return await ${namePascal}Service.read(_id);
  }

  @Post("/update/{_id}")
  @Example<I${namePascal}Doc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: I${namePascal}
  ): Promise<I${namePascal}Doc> {
    return await ${namePascal}Service.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<I${namePascal}Doc>(EX.delete)
  public async delete(@Path() _id: string): Promise<I${namePascal}Doc> {
    return await ${namePascal}Service.delete(_id);
  }
}
`;
};
