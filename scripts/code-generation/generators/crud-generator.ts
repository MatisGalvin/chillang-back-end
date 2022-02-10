import { exit } from "process";
import { controllerGenerator } from "./controller-generator";
import { modelGenerator } from "./model-generator";
import { serviceGenerator } from "./service-generator";
import { swaggerGenerator } from "./swagger-generator";
import { typingGenerator } from "./typing.generator";

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
