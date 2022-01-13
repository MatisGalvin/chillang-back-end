import { mongooseConnect } from "./mongoose/mongooseConnect";
import { serverConnect } from "./server/serverConnect";
import { TranslationFileController } from "./api/translationFile/translationFile.controller";

const server = serverConnect();
mongooseConnect();

new TranslationFileController().listen(server);
