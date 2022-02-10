import { ProjectModel } from "./project.model";
import { IProject } from "./project.typing";

export const ProjectService = {
  create: async (body: IProject) => {
    const createdProject = await ProjectModel.create({
      name: body.name,
      apiKey: body.apiKey,
      pages: body.pages,
      supportedLanguages: body.supportedLanguages,
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

  update: async (id: string, project: Partial<IProject>) => {
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
