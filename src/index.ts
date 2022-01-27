import { Server } from "./server";
import { Mongoose } from "./mongoose";
import { mongooseConfig, serverConfig } from "./config/dev.config";

const mongooseDB = new Mongoose(mongooseConfig.DB_URL);

mongooseDB.connect(
  () => {
    mongooseDB.setFakeDatabase();
  },
  () => {
    console.log("Grosse erreur");
  }
);

const server = new Server(serverConfig.PORT);
server.start();
