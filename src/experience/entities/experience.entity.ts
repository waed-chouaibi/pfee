import { Candidat } from "src/candidat/entities/candidat.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Experience")
export class Experience {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    poste:string
    @Column()
    entreprise:string
    @Column()
    dateDebut:Date
    @Column()
    dateFin:Date
    @Column()
    description:string


    @ManyToMany(()=>Candidat,candidat=>candidat.experience,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    candidat:Candidat
}
