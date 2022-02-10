import write from "write";
import { modelTemplate } from "../templates/model-template";

export const modelGenerator = {
  generateCode(modelName: string) {
    write.sync(
      `./src/api/${modelName}/${modelName}.model.ts`,
      modelTemplate(modelName),
      {
        newline: true,
      }
    );
  },
};
