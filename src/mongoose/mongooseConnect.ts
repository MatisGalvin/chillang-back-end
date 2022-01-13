import mongoose from "mongoose";
import { TranslationFileModel } from "../api/translationFile/translationFile.model";
import { UserController } from "../api/user/user.controller";
import { UserModel } from "../api/user/user.model";
import { connectLink } from "../config/mongoose.config";

function mongooseConnect() {
  mongoose
    .connect(connectLink)
    .then((value) => {
      console.log("DB connected successfully :  ");
    })
    .catch((error) => handleInitialConnectionError(error));

  mongoose.connection.on("error", (err) => {
    console.log("Database connection error : ", err);
  });

  return mongoose;
}

function handleInitialConnectionError(err) {
  console.log("Error during initial connection : ", err);
}

export { mongooseConnect };
