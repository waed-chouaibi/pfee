import { Offreemploi } from "src/offreemploi/entities/offreemploi.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { ChildEntity, OneToMany } from "typeorm";

@ChildEntity("Entreprise")
export class Administrateur extends Utilisateur {
    @OneToMany(()=>Offreemploi,offreemploi=>offreemploi.administrateur,{
        cascade:true
    })
    offreemplois:Offreemploi[];

    // @OneToMany(()=>Utilisateur,utilisateur=>utilisateur.administrateur,{
    //     cascade:true
    // })
    // utilisateurs:Utilisateur[];
}
