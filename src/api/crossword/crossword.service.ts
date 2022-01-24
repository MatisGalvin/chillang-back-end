import { CrosswordModel } from "./crossword.model";
import { Crossword, CrosswordItem } from "./crossword.typing";
import cwGenerator from "crossword-layout-generator";

export const CrosswordService = {
  readAll: async () => {
    const users = await CrosswordModel.find({});

    return users;
  },

  read: async (id: string) => {
    const crossword = await CrosswordModel.findById(id);
    return crossword;
  },

  create: async (username: string) => {
    const createdCrossword = await CrosswordModel.create({
      username,
    });
    return createdCrossword;
  },

  update: async (id: string, crossword: Crossword) => {
    const updatedCrossword = await CrosswordModel.findByIdAndUpdate(
      id,
      crossword,
      {
        new: true,
      }
    );
    return updatedCrossword;
  },

  delete: async (id: string) => {
    const deletedCrossword = await CrosswordModel.findByIdAndDelete(id);
    return deletedCrossword;
  },

  readRandoms: async (qty: number): Promise<Crossword[]> => {
    const randomCrossword = await CrosswordModel.aggregate([
      { $sample: { size: qty } },
    ]);

    return randomCrossword;
  },

  generateRandomCrossword: async (wordsQty: number): Promise<Crossword> => {
    const randomCrosswords = await CrosswordService.readRandoms(wordsQty);
    const randomCrosswordItems: Crossword = {
      data: randomCrosswords.map((randomCrossword): CrosswordItem => {
        var randomWordIndex = Math.round(
          Math.random() * randomCrossword.data.length
        );
        return randomCrossword.data[randomWordIndex];
      }),
    };
    return randomCrosswordItems;
  },
  getCrosswordLayout: async (wordsQty: number): Promise<Crossword> => {
    const crossword = await CrosswordService.generateRandomCrossword(wordsQty);
    var layout = cwGenerator.generateLayout(crossword.data);
    var output_json = layout.result; // words along with orientation, position, startx, and starty
  },
};
