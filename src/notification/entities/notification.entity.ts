import { Candidat } from "src/candidat/entities/candidat.entity";
import { Entreprise } from "src/entreprise/entities/entreprise.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum NotificationType {
  NOUVELLE_OFFRE = "NOUVELLE_OFFRE",
  CANDIDATURE_REPONDUE = "CANDIDATURE_REPONDUE",
  MESSAGE = "MESSAGE",
  BADGE="BADGE",
 RAPPEL= "RAPPEL"
}

@Entity("Notification")
export class Notification {
    @PrimaryGeneratedColumn()
    id:number

  @Column()
  titre: string;

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  notification: NotificationType;

  @Column()
  contenu: string;

  @Column()
  dateEnvoi: Date;

  @Column({ default: false })
  lu: boolean;

  @ManyToOne(()=>Entreprise,entreprise=>entreprise.notifications)
  @JoinColumn({name:'entreprise_id'})
  entreprise:Entreprise;

  @ManyToOne(()=>Candidat,candidat=>candidat.notifications)
  @JoinColumn({name:'candidat_id'})
  candidat:Candidat;
}
