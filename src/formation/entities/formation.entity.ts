import { Candidat } from "src/candidat/entities/candidat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=>Candidat,candidat=>candidat.formartion,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    candidat:Candidat;
}
