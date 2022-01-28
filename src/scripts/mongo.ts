import restore from "mongodb-restore-dump";

async function importDatabase(
  uri: string,
  dbName: string,
  dbDumpFolder: string
) {
  await restore.database({
    uri,
    database: dbName,
    from: dbDumpFolder,
  });
  console.log(`Import database from dump located in ${dbDumpFolder} done. `);
}

export { importDatabase };
