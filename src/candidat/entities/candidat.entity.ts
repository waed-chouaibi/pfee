import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity"
import { ChildEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@ChildEntity("Candidat")
export class Candidat extends Utilisateur{
    @Column()
    ville:string
    @Column()
    niveauEtudes:string
    @Column()
    anneeExperience:number
    @Column()
    imageURL:string
}
