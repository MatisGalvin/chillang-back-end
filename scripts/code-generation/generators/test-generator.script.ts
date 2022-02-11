import write from "write";
import { testTemplate } from "../templates/test-template.script";

export const testGenerator = {
  generateCode(testName: string) {
    write.sync(`./src/test/${testName}.test.ts`, testTemplate(testName), {
      newline: true,
    });
  },
};
