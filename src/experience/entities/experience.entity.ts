import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
