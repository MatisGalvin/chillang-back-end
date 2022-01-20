import express from "express";

export function serverConnect() {
  const server = express();
  const port: number = 3001;

  server.listen(port, () => {
    console.log("Server listening on : ", port);
  });

  return server;
}
