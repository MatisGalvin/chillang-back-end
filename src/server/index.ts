import express, { Express } from "express";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { UserController } from "../api/user/user.controller";
import { ProjectController } from "../api/project/project.controller";
import { PageController } from "../api/page/page.controller";
import { TranslationFileController } from "../api/translationFile/translationFile.controller";
import morgan from "morgan";
import { checkMongooseParamsIDIsValid } from "../middlewares/expressMiddlewares";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chillang API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/translationFile/translationFile.controller.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

const cors = require("cors");
/*
 Class server that use an express server internally
 This class can start, stop the server.
 The server is in charge of telling the controller to listen to http requests
 Finally it can returns the express server via getExpressInstance() to pass it for whom need it
*/
export class Server {
  expressServer: Express;
  server: HttpServer;
  port: number;
  showLog: boolean;

  constructor(port: number, showLog = true) {
    this.showLog = showLog;
    this.port = port;
    this.expressServer = express();
    this.setupMiddlewares();
    this.setControllersToListen();
  }

  // The last middleware will check the route in our url. If there's an ID param, it will called the ckeckMongooseParamsIDIsValid function
  setupMiddlewares() {
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(cors());
    this.expressServer.use(
      morgan(":date[web] :method :url :status - :response-time ms")
    );
    this.expressServer.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(openapiSpecification)
    );
    this.expressServer.use("(/*/):_id", checkMongooseParamsIDIsValid);
  }

  // Make a controller able to listen to http requests
  setControllersToListen() {
    new UserController().listen(this.expressServer);
    new ProjectController().listen(this.expressServer);
    new PageController().listen(this.expressServer);
    new TranslationFileController().listen(this.expressServer);
  }

  start(onStarted?: () => void): void {
    this.server = this.expressServer.listen(this.port, () => {
      this.showLog && console.log("Server listening on : ", this.port);
      onStarted?.();
    });
  }

  stop(onClosed?: () => void): void {
    this.server.close(() => {
      this.showLog && console.log("Server closed");
      onClosed?.();
    });
  }

  // Return only the express server ( because the test and the control don't need this whole class
  //  they just need the express server)
  getExpressInstance(): express.Express {
    return this.expressServer;
  }
}
