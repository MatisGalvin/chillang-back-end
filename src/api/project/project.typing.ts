import { IPagePopulatedDoc } from "../page/page.typing";

export interface IProject {
  name: string;
  apiKey: string;
  pages: string[];
  supportedLanguages: {
    name: string;
    code: string;
  }[];
}

export interface IProjectDoc extends IProject {
  _id: string;
}

export interface IProjectPopulatedDoc extends Omit<IProjectDoc, "pages"> {
  pages: IPagePopulatedDoc[];
}
