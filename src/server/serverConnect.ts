import express from "express";

function serverConnect(port: number) {
  const server = express();

  server.listen(port, () => {
    console.log("Server listening on : ", port);
  });

  return server;
}

export { serverConnect };
