import { Administrateur } from "src/administrateur/entities/administrateur.entity";
import { Condidature } from "src/condidature/entities/condidature.entity";
import { Entreprise } from "src/entreprise/entities/entreprise.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("offreemploi")
export class Offreemploi {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    titre:string
    @Column()
    description:string
    @Column()
    competencesReuises:string
    @Column()
    niveauEtudesRequises:string
    @Column()
    anneesExperienceMin:number
    @Column()
    typeContrat:string
    @Column()
    salaireMin:number
    @Column()
    salaireMax:number
    @Column()
    ville:string
    

    @ManyToOne(()=>Administrateur,administrateur=>administrateur.offreemplois,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'offreemploi_id'})
    administrateur:Administrateur;

    @OneToMany(()=>Condidature,condidature=>condidature.offreemploi,{
        cascade:true
    })
    condidatures:Condidature

    @ManyToOne(()=>Entreprise,entreprise=>entreprise.offreemploi,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    entreprise:Entreprise;
}
