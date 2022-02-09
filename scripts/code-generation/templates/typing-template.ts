import { toPascalCase } from "../utils";

export const typingTemplate = (name: string) => {
  const namePascal = toPascalCase(name);
  return `export interface I${namePascal} {}

export interface I${namePascal}Doc extends I${namePascal} {
  _id: string;
}`;
};
