import { mongooseConnect } from "./mongoose/mongooseConnect";
import { serverConnect } from "./server/serverConnect";
import { UserController } from "./api/user/user.controller";

const server = serverConnect();
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

mongooseConnect();

new UserController().listen(server);
