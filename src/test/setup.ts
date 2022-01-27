import { mongooseConfig } from "../config/test.config";
import { Mongoose } from "../mongoose";
const mongooseDB = new Mongoose(
  `${mongooseConfig.DB_URL}${mongooseConfig.DB_NAME}`
);
/*
  Set up a server + a clean test database for each test file that runs
*/
beforeAll((done) => {
  mongooseDB.connect(() => {
    mongooseDB.dropAll(() => done());
  });
});

afterAll((done) => {
  mongooseDB.close(() => done());
});
