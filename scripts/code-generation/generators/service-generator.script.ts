import write from "write";
import { serviceTemplate } from "../templates/service-template.script";

export const serviceGenerator = {
  generateCode(serviceName: string) {
    write.sync(
      `./src/api/${serviceName}/${serviceName}.service.ts`,
      serviceTemplate(serviceName),
      {
        newline: true,
      }
    );
  },
};
