import { IsNotEmpty, IsString } from "class-validator";
import { CreateUtilisateurDto } from "src/utilisateur/dto/create-utilisateur.dto";

export class CreateEntrepriseDto extends CreateUtilisateurDto {
    @IsString()
    @IsNotEmpty()
    nomEntreprise:string
    @IsString()
    secteurActivite:string
    @IsString()
    taille:string
}
