// import mongoose from "mongoose";
// import { connectLinkDb } from "../config/mongoose.config";
// import { PageController } from "../api/page/page.controller";
// import { UserController } from "../api/user/user.controller";
// import { ProjectController } from "../api/project/project.controller";

// const server = (global.test as any).server;

// beforeAll((done) => {
//   mongoose.connect(connectLinkDb.test, () => {
//     new UserController().listen(server);
//     new PageController().listen(server);
//     new ProjectController().listen(server);
//     done();
//   });
// });

// beforeEach((done) => {
//   mongoose.connection.db.dropDatabase(() => done());
// });

// afterAll((done) => {
//   mongoose.connection.close(() => {
//     done();
//   });
// });
