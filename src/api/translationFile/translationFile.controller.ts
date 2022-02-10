import { TranslationFileService } from "./translationFile.service";
import {
  ITranslationFile,
  ITranslationFileDoc,
} from "./translationFile.typing";
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
import { EX } from "./translationFile.swagger";

@Route("/translationFiles")
@Tags("Translation Files")
export class TranslationFileController extends Controller {
  @Get("/")
  @Example<ITranslationFileDoc[]>(EX.readAll)
  public async readAll(): Promise<ITranslationFileDoc[]> {
    return await TranslationFileService.readAll();
  }

  @Post("/")
  @Example<ITranslationFile>(EX.create)
  public async create(
    @Body() body: ITranslationFile
  ): Promise<ITranslationFileDoc> {
    return await TranslationFileService.create(body);
  }

  @Get("/{_id}")
  @Example<ITranslationFileDoc>(EX.read)
  public async read(@Path() _id: string): Promise<ITranslationFileDoc> {
    return await TranslationFileService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<ITranslationFileDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<ITranslationFile>
  ): Promise<ITranslationFileDoc> {
    return await TranslationFileService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<ITranslationFileDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<ITranslationFileDoc> {
    return await TranslationFileService.delete(_id);
  }
}
