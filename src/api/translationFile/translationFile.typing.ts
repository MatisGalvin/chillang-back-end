export interface ITranslationFile {
  lang: string;
  data: ITranslationFileDataItem[];
}

export interface ITranslationFileDataItem {
  id: string;
  value: string;
  description: string;
}

export interface ITranslationFileRead {
  _id: string;
  lang: string;
  data: ITranslationFileDataItem[];
}

export interface ITranslationFileUpdate extends ITranslationFileRead {}

export interface ITranslationFileDelete extends ITranslationFileRead {}
