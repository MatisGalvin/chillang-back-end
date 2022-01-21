import { mongooseConnect } from "./mongoose/mongooseConnect";
import { serverConnect } from "./server/serverConnect";
import { UserController } from "./api/user/user.controller";
import { ProjectController } from "./api/project/project.controller";
import { PageController } from "./api/page/page.controller";
import { TranslationFileController } from "./api/translationFile/translationFile.controller";
import { connectLinkDb } from "./config/mongoose.config";
import { portServer } from "./config/server.config";

const server = serverConnect(portServer.dev);

mongooseConnect(connectLinkDb.dev);

new UserController().listen(server);
new ProjectController().listen(server);
new PageController().listen(server);
new TranslationFileController().listen(server);

export { server };
