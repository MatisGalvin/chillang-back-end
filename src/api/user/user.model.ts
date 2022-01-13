import mongoose from "mongoose";
import { IUser } from "./user.typing";

//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema User
const UserSchema = new Schema<IUser>({
  username: String,
  encryptedPassword: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

//Création d'un model de User basée sur le Schema défini.
const UserModel = mongoose.model<IUser>("User", UserSchema);

//Exportation du model User pour pouvoir y accéder de l'exterieur.
export { UserModel };
