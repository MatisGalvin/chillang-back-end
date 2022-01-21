import { portServer } from "./config/server.config";
import { serverConnect } from "./server/serverConnect";

module.exports = async () => {
  let server = serverConnect(portServer.test);
  process.env.JAMBON = server;

  console.log(
    "Fichier declanche ===========================================================",
    process.env.JAMBON
  );
};
