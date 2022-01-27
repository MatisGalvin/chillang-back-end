import mongoose, { model, mongo } from "mongoose";
import { SET_DB_WITH_FAKE_DATA } from "../config/dev.config";
import { importDatabase } from "../scripts/mongo";
import { resolve } from "path";

/**
 * Mongoose class in charge of connecting and showing an error in case of connection failure
 */

export class Mongoose {
  url: string;
  showLog: boolean;

  constructor(url: string, showLog = true) {
    this.url = url;
    this.showLog = showLog;
  }

  connect(onConnected?: () => void, onError?: () => void) {
    mongoose
      .connect(this.url)
      .then(async (value) => {
        this.showLog && console.log("DB connected successfully");
        onConnected?.();
      })
      .catch((error) =>
        console.log("Error during initial connection : ", error)
      );

    mongoose.connection.on("error", (err) => {
      console.log("Database connection error : ", err);
      onError?.();
    });
  }

  setFakeDatabase() {
    this.dropAll(() => {
      const pathToDBFakeDump = resolve(
        "./src/mongoose/dump/testData/chillangDatabase"
      );
      console.log(pathToDBFakeDump);
      console.log(mongoose.connection.host);
      importDatabase(
        `mongodb://${mongoose.connection.host}:${mongoose.connection.port}/`,
        mongoose.connection.db.databaseName,
        pathToDBFakeDump
      );
    });
  }

  dropAll(onDropped: () => void) {
    mongoose.connection.db.dropDatabase(() => {
      onDropped?.();
    });
  }

  close(onClose?: () => void) {
    mongoose.connection.close(() => {
      onClose?.();
    });
  }
}
