import { toPascalCase } from "../utils";

export const modelTemplate = (name: string) => {
  const pascalName = toPascalCase(name);
  return `import mongoose from "mongoose";
import { I${pascalName} } from "./${name}.typing";

const Schema = mongoose.Schema;

const ${pascalName}Schema = new Schema<I${pascalName}>({}, { versionKey: false });

const ${pascalName}Model = mongoose.model<I${pascalName}>("${pascalName}", ${pascalName}Schema);

export { ${pascalName}Model };
`;
};
