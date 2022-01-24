import axios from "axios";
import { CrosswordModel } from "./api/crossword/crossword.model";
import { Crossword } from "./api/crossword/crossword.typing";
const BASE_URL = "https://www.ledevoir.com/documents/mc";

async function scrapCrossword(ddmmyy: string) {
  try {
    const response = await axios.get<Crossword[]>(`${BASE_URL}/${ddmmyy}.json`);
    if (response.data?.length > 0) {
      CrosswordModel.create({ data: response.data });
      console.log("Store ", ddmmyy);
    }
  } catch (e) {
    console.log("Error catch");
  }
}

export { scrapCrossword };

/*
const INTERVAL = 5000;
const START_DATE = dayjs("2022-01-22");
const END_DATE = dayjs();

let currentDate = START_DATE;

const mongooseDB = new Mongoose(mongooseConfig.DB_URL);

mongooseDB.connect(() => {
  setInterval(() => {
    if (currentDate.diff(END_DATE) < 0) {
      console.log("Diff with end date ", currentDate.diff(END_DATE));
      scrapCrossword(currentDate.format("DDMMYY"));
      currentDate = currentDate.add(1, "day");
    }
  }, INTERVAL);
});
*/
