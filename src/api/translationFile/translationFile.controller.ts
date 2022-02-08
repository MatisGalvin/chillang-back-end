import { TranslationFileService } from "./translationFile.service";
import { Express, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import {
  ITranslationFile,
  ITranslationFileDelete,
  ITranslationFileRead,
  ITranslationFileUpdate,
} from "./translationFile.typing";
import {
  Body,
  BodyProp,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Route,
} from "tsoa";
import { EX } from "./translationFile.swagger";

@Route("/translationFiles")
export class TranslationFileController extends Controller {
  @Get("/")
  @Example<ITranslationFile[]>(EX.readAll)
  public async readAll(): Promise<ITranslationFile[]> {
    return await TranslationFileService.readAll();
  }

  @Post("/")
  @Example<ITranslationFile>(EX.create)
  public async create(
    @Body() body: ITranslationFile
  ): Promise<ITranslationFile> {
    return await TranslationFileService.create(body);
  }

  @Get("/{_id}")
  @Example<ITranslationFileRead>(EX.read)
  public async read(@Path() _id: string): Promise<ITranslationFileRead> {
    return await TranslationFileService.read(_id);
  }

  @Post("/update/{_id}")
  @Example<ITranslationFileUpdate>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: ITranslationFile
  ): Promise<ITranslationFileUpdate> {
    return await TranslationFileService.update(_id, body);
  }

  @Delete("/delete/{_id}")
  @Example<ITranslationFileDelete>(EX.delete)
  public async delete(@Path() _id: string): Promise<ITranslationFileDelete> {
    return await TranslationFileService.delete(_id);
  }
}
