import { PageModel } from "./page.model";
import { IPage } from "./page.typing";

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
    const pages = await PageModel.findById(id).populate({
      path: "translationFiles",
    });
    return pages;
  },

  update: async (id: string, page: IPage) => {
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
