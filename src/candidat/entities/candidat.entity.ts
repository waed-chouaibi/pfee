import { Condidature } from "src/condidature/entities/condidature.entity"
import { Conversation } from "src/conversation/entities/conversation.entity"
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity"
import { ChildEntity, Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Notification } from "src/notification/entities/notification.entity"
import { Cv } from "src/cv/entities/cv.entity"
import { Certification } from "src/certification/entities/certification.entity"
import { Formation } from "src/formation/entities/formation.entity"
import { Experience } from "src/experience/entities/experience.entity"
import { Competence } from "src/competence/entities/competence.entity"

@ChildEntity("Candidat")
export class Candidat extends Utilisateur{
    @Column()
    ville:string
    @Column()
    niveauEtudes:string
    @Column()
    anneeExperience:number
    @Column()
    imageURL:string


    @OneToMany(()=>Conversation,conversation=>conversation.candidat,{
        cascade:true
    })
    conversations:Conversation

    @OneToMany(()=>Condidature,condidature=>condidature.dateCandidature,{
        cascade:true
    })
    condidatures:Condidature[];

    @OneToMany(()=>Notification , notification=>notification.candidat,{
        cascade:true
    })
    notifications:Notification[];

    @OneToOne(()=>Cv,cv=>cv.candidat,{
        cascade:true
    })
    cv:Cv;

    @OneToMany(()=>Certification, certification=>certification.candidat,{
        cascade:true
    })
    certification:Certification;


    @OneToMany(()=>Formation,formation=>formation.candidat,{
        cascade:true
    })
    formartion:Formation;

    @OneToMany(()=>Experience,experience=>experience.candidat,{
        cascade:true
    })
    experience:Experience

    @OneToMany(()=>Competence,competence=>competence.candidat,{
        cascade:true
    })
    competence:Competence
    
}
