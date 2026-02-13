import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUtilisateurDto } from "src/utilisateur/dto/create-utilisateur.dto";

export class CreateCandidatDto extends CreateUtilisateurDto{
    @Type(()=>Date)
    @IsDate()
    dateNaissance:Date
    @IsString()
    ville:string
    @IsString()
    niveauEtudes:string
    @Type(()=>Number)
    @IsNumber()
    anneesExperience:number
    @IsString()
    @IsOptional()
    imageURL?:string
}
