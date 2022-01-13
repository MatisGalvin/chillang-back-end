import { TranslationFileModel } from "./translationFile.model";

export const TranslationFileService = {
  readAll: async () => {
    const translationFiles = await TranslationFileModel.find({});

    console.log(translationFiles);

    return translationFiles;
  },
};
