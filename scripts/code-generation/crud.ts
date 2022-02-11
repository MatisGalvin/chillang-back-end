import { exit } from "process";
import { createFileFromTemplate } from "../utils.script";

const params = process.argv.slice(2, process.argv.length);
if (params.length !== 1) {
  console.log("You are missing a param, usage :  yarn run crud <apiName>");
  exit(-1);
}

const name = params[0];

createFileFromTemplate("./src/api", name, "controller", name)
createFileFromTemplate("./src/api", name, "typing", name)
createFileFromTemplate("./src/api", name, "service", name)
createFileFromTemplate("./src/api", name, "model", name)
createFileFromTemplate("./src/api", name, "swagger", name)
createFileFromTemplate("./src/api", name, "test", name)
