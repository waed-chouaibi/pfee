import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { ChildEntity } from "typeorm";

@ChildEntity("Entreprise")
export class Administrateur extends Utilisateur {}
