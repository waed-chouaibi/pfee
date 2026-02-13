import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
