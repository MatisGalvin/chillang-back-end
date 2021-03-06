import write from "write";
import { typingTemplate } from "../templates/typing-template";

export const typingGenerator = {
  generateCode(typingName: string) {
    write.sync(
      `./src/api/${typingName}/${typingName}.typing.ts`,
      typingTemplate(typingName),
      {
        newline: true,
      }
    );
  },
};
