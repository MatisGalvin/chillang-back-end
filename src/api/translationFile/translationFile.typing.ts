export interface ITranslationFile {
  lang: string;
  data: [
    {
      id: string;
      value: string;
      description: string;
    }
  ];
}
