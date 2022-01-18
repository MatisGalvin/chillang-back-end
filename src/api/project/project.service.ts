import { ProjectModel } from "./project.model";

export const ProjectService = {
  readAll: async () => {
    const projects = await ProjectModel.find({});
    return projects;
  },
};
