import { Candidat } from "src/candidat/entities/candidat.entity";
import { Offreemploi } from "src/offreemploi/entities/offreemploi.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Condidature")
export class Condidature {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    dateCandidature:Date
    @Column()
    statut:string
    @Column()
    scoreCompatibilite:number
    

    @ManyToOne(()=>Candidat,candidat=>candidat.condidatures,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'candidat_id'})
    candidat:Candidat;


    @ManyToOne(()=>Offreemploi,offreemploi=>offreemploi.condidatures,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'offremploi_id'})
    offreemploi:Offreemploi;
}
