import { exit } from "process";
import { crudGenerator } from "./generators/crud-generator.script";

const params = process.argv.slice(2, process.argv.length);
if (params.length !== 1) {
  console.log("You are missing a param, usage :  yarn run crud <apiName>");
  exit(-1);
}

const name = params[0];
crudGenerator.generateCode(name);
