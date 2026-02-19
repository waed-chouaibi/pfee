import { Candidat } from "src/candidat/entities/candidat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Certification")
export class Certification {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    nom:string
    @Column()
    organisme:string
    @Column()
    dateObtention:Date
    @Column()
    urlCertificat:string

    @ManyToOne(()=>Candidat,candidat=>candidat.certification,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    candidat:Candidat;

}
