export interface Crossword {
  data: CrosswordItem[];
}

export interface CrosswordItem {
  clue: string;
  answer: string;
}

export interface CrosswordLayout {
  clue: string;
  answer: string;
  startx: number;
  starty: number;
  position: number;
  orientation: string;
}
