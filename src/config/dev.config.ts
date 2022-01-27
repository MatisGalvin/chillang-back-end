/**
 *   Development configs
 */

export const dbName = "chillangDatabase";

export const mongooseConfig = Object.freeze({
  DB_URL: `mongodb://localhost:27017/${dbName}`,
});

export const serverConfig = Object.freeze({
  PORT: 3090,
});

export const SET_DB_WITH_FAKE_DATA = true;
