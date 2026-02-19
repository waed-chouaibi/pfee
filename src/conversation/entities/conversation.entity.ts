import { Candidat } from "src/candidat/entities/candidat.entity";
import { Entreprise } from "src/entreprise/entities/entreprise.entity";
import { Message } from "src/message/entities/message.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Conversation")
export class Conversation {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    dateCreation:Date


    @ManyToOne(()=>Candidat,candidat=>candidat.conversations,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'candidat_id'})
    candidat:Candidat
    @ManyToOne(() => Entreprise, entreprise => entreprise.conversations, {
         onDelete: 'CASCADE'
    })
        @JoinColumn({ name: 'entreprise_id' })
        entreprise: Entreprise;
    @OneToMany(()=>Message,message=>message.conversation,{
        cascade:true
    })
    message:Message;

}
