import mongoose from "mongoose";

function mongooseConnect(link) {
  mongoose
    .connect(link)
    .then(async (value) => {
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
