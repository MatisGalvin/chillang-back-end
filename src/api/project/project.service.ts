import { ProjectModel } from "./project.model";
import { IProject } from "./project.typing";

export const ProjectService = {
  create: async (name: string, api_key: string, pages: string[]) => {
    const createdProject = new ProjectModel({
      name: name,
      api_key: api_key,
      pages: pages,
    });
    return createdProject;
  },

  readAll: async () => {
    const projects = await ProjectModel.find({});
    return projects;
  },

  read: async (id: string) => {
    const project = await ProjectModel.findById(id);
    return project;
  },
};
