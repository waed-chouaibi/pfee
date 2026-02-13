import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Formation")
export class Formation {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    diplome:string
    @Column()
    etablissement:string
    @Column()
    dateDebut:Date
    @Column()
    dateFin:Date
    @Column()
    mention:string
}
