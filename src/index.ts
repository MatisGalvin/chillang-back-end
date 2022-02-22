require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const testEnv = require("dotenv").config({
  path: `.env.test`,
}).parsed;

import { Server } from "./server";
import { Mongoose } from "./mongoose";
import { SET_DB_WITH_FAKE_DATA } from "./config/config";

/**
 * In order to set fake data in the DB, you can change the value of SET_DB_FAKE_DATA.
 * DB_NAME DB_URL and SERVER_PORT are set using NODE_ENV value.
 * For each value of NODE_ENV (set in the package.JSON), DB_NAME DB_URL and SERVER_PORT are setting with the
 * data in the file named .env.${NODE_ENV}
 */

const mongooseDB = new Mongoose(
  process.env.NODE_ENV !== "production" && SET_DB_WITH_FAKE_DATA
    ? `${testEnv.DB_URL}${testEnv.DB_NAME}`
    : `${process.env.DB_URL}${process.env.DB_NAME}`
);

mongooseDB.connect(() => {
  if (process.env.NODE_ENV !== "production" && SET_DB_WITH_FAKE_DATA) {
    mongooseDB.setFakeDatabase();
  }
});

const server = new Server(process.env.SERVER_PORT);
server.start();
