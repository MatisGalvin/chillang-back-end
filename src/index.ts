import { Server } from "./server";
import { Mongoose } from "./mongoose";
import {
  mongooseConfig,
  serverConfig,
  SET_DB_WITH_FAKE_DATA,
} from "./config/dev.config";
import { mongooseConfig as mongooseConfigTest } from "./config/test.config";

const mongooseDB = new Mongoose(
  SET_DB_WITH_FAKE_DATA
    ? `${mongooseConfigTest.DB_URL}${mongooseConfigTest.DB_NAME}`
    : `${mongooseConfig.DB_URL}${mongooseConfig.DB_NAME}`
);

mongooseDB.connect(
  () => {
    if (SET_DB_WITH_FAKE_DATA) {
      mongooseDB.setFakeDatabase();
    }
  },
  () => {
    console.log("Grosse erreur");
  }
);

const server = new Server(serverConfig.PORT);
server.start();
