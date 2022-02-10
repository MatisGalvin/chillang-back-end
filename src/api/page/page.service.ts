import { ITranslationFileDoc } from "../translationFile/translationFile.typing";
import { PageModel } from "./page.model";
import { IPage, IPageDoc, IPagePopulatedDoc } from "./page.typing";

export const PageService = {
  create: async (body: IPage) => {
    const createdPages = await PageModel.create({
      name: body.name,
      translationFiles: body.translationFiles,
    });
    return createdPages;
  },

  readAll: async () => {
    const pages = await PageModel.find({});
    return pages;
  },

  read: async (id: string) => {
    const page = await PageModel.findById(id).populate<{
      translationFiles: ITranslationFileDoc[];
    }>({
      path: "translationFiles",
    });
    return page;
  },

  update: async (id: string, page: Partial<IPage>) => {
    const updatedPage = await PageModel.findByIdAndUpdate(id, page, {
      new: true,
    });
    return updatedPage;
  },

  delete: async (id: string) => {
    const deletedPage = await PageModel.findByIdAndDelete(id);
    return deletedPage;
  },
};
