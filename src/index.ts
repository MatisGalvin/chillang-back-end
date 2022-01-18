import { mongooseConnect } from "./mongoose/mongooseConnect";
import { serverConnect } from "./server/serverConnect";
import { UserController } from "./api/user/user.controller";

const server = serverConnect();
mongooseConnect();

new UserController().listen(server);
