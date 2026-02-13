import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
