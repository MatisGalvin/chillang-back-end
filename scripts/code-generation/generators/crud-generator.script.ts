import { controllerGenerator } from "./controller-generator.script";
import { modelGenerator } from "./model-generator.script";
import { serviceGenerator } from "./service-generator.script";
import { swaggerGenerator } from "./swagger-generator.script";
import { typingGenerator } from "./typing.generator.script";
import { testGenerator } from "./test-generator.script";

/**
 * Generate code
 */

export const crudGenerator = {
  generateCode(crudName: string) {
    controllerGenerator.generateCode(crudName);
    modelGenerator.generateCode(crudName);
    typingGenerator.generateCode(crudName);
    serviceGenerator.generateCode(crudName);
    swaggerGenerator.generateCode(crudName);
    testGenerator.generateCode(crudName);
  },
};
