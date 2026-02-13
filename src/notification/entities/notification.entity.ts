import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
