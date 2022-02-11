import write from "write";
import { swaggerTemplate } from "../templates/swagger-template.script";

export const swaggerGenerator = {
  generateCode(swaggerName: string) {
    write.sync(
      `./src/api/${swaggerName}/${swaggerName}.swagger.ts`,
      swaggerTemplate(),
      {
        newline: true,
      }
    );
  },
};
