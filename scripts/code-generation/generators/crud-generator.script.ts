import { exit } from "process";
import { controllerGenerator } from "./controller-generator.script";
import { modelGenerator } from "./model-generator.script";
import { serviceGenerator } from "./service-generator.script";
import { swaggerGenerator } from "./swagger-generator.script";
import { typingGenerator } from "./typing.generator.script";

const params = process.argv.slice(2, process.argv.length);
if (params.length !== 1) {
  console.log("You are missing a param, usage :  yarn run crud <apiName>");
  exit(-1);
}
const name = params[0];

/**
 * Generate code
 */
controllerGenerator.generateCode(name);
modelGenerator.generateCode(name);
typingGenerator.generateCode(name);
serviceGenerator.generateCode(name);
swaggerGenerator.generateCode(name);
