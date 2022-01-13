import express from "express";

function serverConnect() {
  const server = express();
  const port: number = 3000;

  server.listen(port, () => {
    console.log("Server listening on : ", port);
  });

  return server;
}

export { serverConnect };
