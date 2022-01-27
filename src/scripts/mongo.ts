import restore from "mongodb-restore-dump";

async function importDatabase(
  uri: string,
  dbName: string,
  databaseDumpFolderAbsolutePath: string
) {
  await restore.database({
    uri,
    database: dbName,
    from: databaseDumpFolderAbsolutePath,
  });
  console.log(
    `Import database from dump located in ${databaseDumpFolderAbsolutePath} done. `
  );
}

export { importDatabase };
