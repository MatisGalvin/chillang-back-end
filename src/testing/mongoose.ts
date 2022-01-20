import mongoose from "mongoose";
import { serverConnect } from "./server";

function mongooseConnect() {
  mongoose.connect("mongodb://localhost:27017/acmedb").then(() => {
    const app = serverConnect(); // new
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });

  return mongoose;
}

export { mongooseConnect };
