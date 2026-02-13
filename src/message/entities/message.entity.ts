import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Message")
export class Message {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    contenu:String
    @Column()
    dateEnvoi:Date
    // @Column()
    // emetteur:Utilisateur
    @Column()
    lu:boolean
}
