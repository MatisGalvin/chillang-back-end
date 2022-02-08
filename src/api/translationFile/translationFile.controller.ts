import { TranslationFileService } from "./translationFile.service";
import { Express, Response } from "express";
import { IDeleteRequest, IReadRequest } from "../../typings/request.typing";
import { ITranslationFile } from "./translationFile.typing";
import { Body, BodyProp, Controller, Example, Get, Post, Route } from "tsoa";
import { EX } from "./translationFile.swagger";

@Route("/translationFiles")
export class TranslationFileController extends Controller {
  @Get("/")
  @Example<ITranslationFile[]>(EX.readAll)
  public async readAll(): Promise<ITranslationFile[]> {
    return await TranslationFileService.readAll();
  }

  @Post("/")
  public async create(@Body() body: ITranslationFile): Promise<any> {
    return await TranslationFileService.create(body);
  }

  // private async read(req: IReadRequest, res: Response) {
  //   const { _id } = req.params;
  //   const translationFile = await TranslationFileService.read(_id);
  //   res.send(translationFile);
  // }

  // private async update(
  //   req: Request<{ _id: string }, {}, { translationFile: ITranslationFile }>,
  //   res: Response
  // ) {
  //   const { _id } = req.params;
  //   const { translationFile } = req.body;
  //   const updatedTranslationFile = await TranslationFileService.update(
  //     _id,
  //     translationFile
  //   );
  //   res.send(updatedTranslationFile);
  // }

  // private async delete(req: IDeleteRequest, res: Response) {
  //   const { _id } = req.params;
  //   const deletedTranslationFile = await TranslationFileService.delete(_id);
  //   res.send(deletedTranslationFile);
  // }
}
