import "dotenv/config";
import { Server } from "./server";
import { Mongoose } from "./mongoose";
import {
  mongooseConfig,
  serverConfig,
  SET_DB_WITH_FAKE_DATA,
} from "./config/dev.config";
import { mongooseConfig as mongooseConfigTest } from "./config/test.config";

console.log("Environment: ", process.env.NODE_ENV);
/**
 * In order to set fake data in the DB, you can change the value of SET_DB_FAKE_DATA.
 * DB_NAME will have 2 possible values : "testDatabase" in test mode or "chillangDatabase" in normal mode
 */

const mongooseDB = new Mongoose(
  SET_DB_WITH_FAKE_DATA
    ? `${mongooseConfigTest.DB_URL}${mongooseConfigTest.DB_NAME}`
    : `${mongooseConfig.DB_URL}${mongooseConfig.DB_NAME}`
);

mongooseDB.connect(() => {
  if (SET_DB_WITH_FAKE_DATA) {
    mongooseDB.setFakeDatabase();
  }
});

const server = new Server(serverConfig.PORT);
server.start();
