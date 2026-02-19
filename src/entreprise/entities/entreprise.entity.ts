import { Conversation } from "src/conversation/entities/conversation.entity";
import { Notification } from "src/notification/entities/notification.entity";
import { Offreemploi } from "src/offreemploi/entities/offreemploi.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { ChildEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity("entreprise")
export class Entreprise extends Utilisateur{
   
    @Column()
    nomEntreprise:string
    @Column()
    secteurActivite:string
    @Column()
    taille:string


    @OneToMany(()=>Notification,notification=>notification.entreprise,{
        cascade:true
    })
    notifications:Notification[];

   @OneToMany(() => Conversation, conversation => conversation.entreprise, {
  cascade: true
})
conversations: Conversation[];
@OneToMany(()=>Offreemploi,offreemploi=>offreemploi.entreprise,{
    cascade:true
})
offreemploi:Offreemploi

}
