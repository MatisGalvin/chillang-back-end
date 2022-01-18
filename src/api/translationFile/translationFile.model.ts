import mongoose from "mongoose";
import { ITranslationFile } from "./translationFile.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";

//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema Translation constitué de données de type String.
const TranslationFileSchema = new Schema<ITranslationFile>({
  lang: String,
  data: [
    {
      id: String,
      value: String,
    },
  ],
});

//Création d'un model de Translation basée sur le Schema défini.
const TranslationFileModel = mongoose.model<ITranslationFile>(
  COLLECTION_NAMES.TRANSLATION_FILE,
  TranslationFileSchema
);

//Exportation du model Translation pour pouvoir y accéder de l'exterieur.
export { TranslationFileModel };
