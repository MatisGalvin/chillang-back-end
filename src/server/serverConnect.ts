import express from "express";
import bodyParser from "body-parser";

function serverConnect(port: number) {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.listen(port, () => {
    console.log("Server listening on : ", port);
  });

  return server;
}

export { serverConnect };
