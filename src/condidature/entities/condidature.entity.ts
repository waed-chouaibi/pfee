import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
