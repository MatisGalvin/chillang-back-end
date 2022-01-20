import { TranslationFileModel } from "./translationFile.model";
import { ITranslationFile } from "./translationFile.typing";

export const TranslationFileService = {
  create: async (lang: string, data: string[]) => {
    const createdTranslationFile = await TranslationFileModel.create({
      lang,
      data,
    });
    return createdTranslationFile;
  },

  readAll: async () => {
    const translationFiles = await TranslationFileModel.find({});
    return translationFiles;
  },

  read: async (id: string) => {
    const translationFile = await TranslationFileModel.findById(id);
    return translationFile;
  },

  update: async (id: string, translationFile: ITranslationFile) => {
    const updatedTranslationFile = await TranslationFileModel.findByIdAndUpdate(
      id,
      translationFile,
      { new: true }
    );
    return updatedTranslationFile;
  },

  delete: async (id: string) => {
    const deletedTranslationFile = await TranslationFileModel.findByIdAndDelete(
      id
    );
    return deletedTranslationFile;
  },
};
