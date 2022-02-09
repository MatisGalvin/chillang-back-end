import { ITranslationFileDoc } from "../translationFile/translationFile.typing";
export interface IPage {
  name: string;
  translationFiles: string[];
}

export interface IPageDoc extends IPage {
  _id: string;
}

export interface IPageRead {
  _id: string;
  name: string;
  translationFiles: ITranslationFileDoc[];
}
