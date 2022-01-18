import { PageModel } from "./page.model";

export const PageService = {
  readAll: async () => {
    const Pages = await PageModel.find({});
    return Pages;
  },
};
