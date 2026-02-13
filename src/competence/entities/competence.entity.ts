import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CompetenceType{
    DEBUTANT="DEBUTANT",
    INTERMEDIAIRE="INTERMEDIAIRE",
    AVANCE="AVANCE",
    EXPERT="EXPERT"
}

@Entity("competence")
export class Competence {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    nom:string
    @Column({
        type:"enum",
        enum:CompetenceType
    })
    niveau:CompetenceType
    @Column()
    description:string
    @Column()
    categorie:string
}
