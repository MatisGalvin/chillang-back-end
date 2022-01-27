import { exec } from "child_process";
import { dbName } from "../config/dev.config";

export function importDatabase(
  databaseDumpFolderAbsolutePath: string,
  done?: () => void
) {
  exec(
    `mongorestore -d ${dbName} --dir ${databaseDumpFolderAbsolutePath}`,
    (error, stdout, stderr) => {
      console.log("Dump done");
      done?.();
    }
  );
}
