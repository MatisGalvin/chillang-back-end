import { Server } from "./server";
import { Mongoose } from "./mongoose";
import { mongooseConfig, serverConfig } from "./config/dev.config";
import axios from "axios";
import { CrosswordService } from "./api/crossword/crossword.service";
new Mongoose(mongooseConfig.DB_URL).connect(async () => {
  const crossword = await CrosswordService.generateRandomCrossword(10);
});
