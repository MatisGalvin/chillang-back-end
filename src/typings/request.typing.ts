import { Request } from "express";
import { ITranslationFile } from "../api/translationFile/translationFile.typing";

export interface IReadRequest extends Request<{ _id: string }, {}, {}> {}
export interface IDeleteRequest extends Request<{ _id: string }, {}, {}> {}
