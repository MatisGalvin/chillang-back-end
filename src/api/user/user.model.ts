import mongoose from "mongoose";
import { IUser } from "./user.typing";
import { COLLECTION_NAMES } from "../../mongoose/constants";
import "../project/project.model";
import "../page/page.model";
import "../translationFile/translationFile.model";

//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema User
const UserSchema = new Schema<IUser>({
  username: String,
  encryptedPassword: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_NAMES.PROJECT,
    },
  ],
});

//Création d'un model de User basée sur le Schema défini.
const UserModel = mongoose.model<IUser>(COLLECTION_NAMES.USER, UserSchema);

//Exportation du model User pour pouvoir y accéder de l'exterieur.
export { UserModel };
