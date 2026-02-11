import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity("entreprise")
export class Entreprise extends Utilisateur{
   
    @Column()
    nomEntreprise:string
    @Column()
    secteurActivite:string
    @Column()
    taille:string
}
