import { TranslationFileModel } from "./translationFile.model";
import { ITranslationFile } from "./translationFile.typing";

export const TranslationFileService = {
  readAll: async () => {
    const translationFiles = await TranslationFileModel.find({});
    return translationFiles;
  },

  create: async (lang: string, data: string[]) => {
    const createdTranslationFile = TranslationFileModel.create({
      lang: lang,
      data: data,
    });
    return createdTranslationFile;
  },
};
