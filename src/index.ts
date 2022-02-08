import { Server } from "./server";
import { Mongoose } from "./mongoose";
import {
  mongooseConfig,
  serverConfig,
  SET_DB_WITH_FAKE_DATA,
} from "./config/dev.config";
import { mongooseConfig as mongooseConfigTest } from "./config/test.config";
import express from "express";
import bodyParser from "body-parser";
import { TranslationFileController } from "./api/translationFile/translationFile.controller";
import { RegisterRoutes } from "../dist/routes";
import * as swaggerUI from "swagger-ui-express";
import { Swagger } from "tsoa";

/**
 * In order to set fake data in the DB, you can change the value of SET_DB_FAKE_DATA.
 * DB_NAME will have 2 possible values : "testDatabase" in test mode or "chillangDatabase" in normal mode
 */

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
    console.log(" ===== There is an error here ! =====");
  }
);

const server = new Server(serverConfig.PORT);

server.start();
