import express, { Express } from "express";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { UserController } from "../api/crossword/crossword.controller";

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

  setupMiddlewares() {
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(bodyParser.json());
  }

  // Make a controller able to listen to http requests
  setControllersToListen() {
    new UserController().listen(this.expressServer);
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
