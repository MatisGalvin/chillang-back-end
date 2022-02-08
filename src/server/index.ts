import express, { Express } from "express";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import morgan from "morgan";
import { checkMongooseParamsIDIsValid } from "../middlewares/expressMiddlewares";
import * as swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "../../dist/routes";

const swaggerDocument = require("../../swagger.json");
const cors = require("cors");
/*
 Class server that use an express server internally
 This class can start, stop the server.
 The server is in charge of telling the controller to listen to http requests (by the use of RegisterRoute)
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
  }

  generateDocumentation() {
    try {
      this.expressServer.use(
        "/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerDocument)
      );
    } catch (err) {
      console.error("unable to read swagger.json", err);
    }
  }

  // The last middleware will check the route in our url. If there's an ID param, it will called the ckeckMongooseParamsIDIsValid function
  setupMiddlewares() {
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(cors());
    this.expressServer.use(
      morgan(":date[web] :method :url :status - :response-time ms")
    );

    // @todo : A FAIRE
    RegisterRoutes(this.expressServer);
    this.generateDocumentation();

    // Middleware that check on url must be called after the documentation has been generated
    this.expressServer.use("(/*/):_id", checkMongooseParamsIDIsValid);
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
