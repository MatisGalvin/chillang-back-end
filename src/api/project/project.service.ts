import { ProjectModel } from "./project.model";
import { IProject } from "./project.typing";

export const ProjectService = {
  create: async (name: string, apiKey: string, pages: string[]) => {
    const createdProject = await ProjectModel.create({
      name,
      apiKey,
      pages,
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

  update: async (id: string, project: IProject) => {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, project, {
      new: true,
    });
    return updatedProject;
  },

  delete: async (id: string) => {
    const deletedProject = await ProjectModel.findByIdAndRemove(id);
    return deletedProject;
  },
};
