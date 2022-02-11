import { JambonoModel } from "./jambono.model";
import { IJambono } from "./jambono.typing";

export const JambonoService = {
  create: async (body: IJambono) => {
    const createdJambono = await JambonoModel.create(body);
    return createdJambono;
  },

  readAll: async () => {
    const jambonos = await JambonoModel.find({});
    return jambonos;
  },

  read: async (id: string) => {
    const jambono = await JambonoModel.findById(id);
    return jambono;
  },

  update: async (id: string, body: Partial<IJambono>) => {
    const updatedJambono = await JambonoModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedJambono;
  },

  delete: async (id: string) => {
    const deletedJambono = await JambonoModel.findByIdAndDelete(id);
    return deletedJambono;
  },
};
  
