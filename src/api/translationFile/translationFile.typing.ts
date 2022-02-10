export interface ITranslationFile {
  lang: string;
  data: ITranslationFileDataItem[];
}

export interface ITranslationFileDataItem {
  id: string;
  value: string;
  description: string;
}

export interface ITranslationFileDoc extends ITranslationFile {
  _id: string;
}
