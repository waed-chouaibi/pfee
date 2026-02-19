import { Candidat } from "src/candidat/entities/candidat.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cv")
export class Cv {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    cvPDF:string
    @Column()
    dateCreation:Date
    @Column()
    dateDerniereModification:Date

    @OneToOne(()=>Candidat,candidat=>candidat.conversations,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    candidat:Candidat;
}
