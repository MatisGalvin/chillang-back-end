import write from "write";
import { controllerTemplate } from "../templates/controller-template";

export const controllerGenerator = {
  generateCode(controllerName: string) {
    write.sync(
      `./src/api/${controllerName}/${controllerName}.controller.ts`,
      controllerTemplate(controllerName),
      {
        newline: true,
      }
    );
  },
};
