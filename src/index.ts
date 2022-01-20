import { mongooseConnect } from "./mongoose/mongooseConnect";
import { serverConnect } from "./server/serverConnect";
import { UserController } from "./api/user/user.controller";
import { ProjectController } from "./api/project/project.controller";
import { PageController } from "./api/page/page.controller";
import { TranslationFileController } from "./api/translationFile/translationFile.controller";
const bodyParser = require("body-parser");

const server = serverConnect();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

mongooseConnect();

new UserController().listen(server);
new ProjectController().listen(server);
new PageController().listen(server);
new TranslationFileController().listen(server);
