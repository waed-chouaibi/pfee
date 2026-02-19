import { Conversation } from "src/conversation/entities/conversation.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(()=>Conversation,conversation=>conversation.message,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    conversation:Conversation
}
