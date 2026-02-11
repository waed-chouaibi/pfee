import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Conversation")
export class Conversation {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    dateCreation:Date
}
