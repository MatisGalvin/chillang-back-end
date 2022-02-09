import { ITranslationFileRead } from "../translationFile/translationFile.typing";

export interface IPage {
  name: string;
  translationFiles: string[];
}

export interface IPageRead {
  _id: string;
  name: string;
  translationFiles: ITranslationFileRead[];
}

export interface IPageUpdate {
  _id: string;
  name: string;
  translationFiles: string[];
}

export interface IPageDelete extends IPageUpdate {}
