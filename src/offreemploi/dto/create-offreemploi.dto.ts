import { IsNumber, IsString } from "class-validator";

export class CreateOffreemploiDto {
    @IsString()
    titre:string
    @IsString()
    description:string
    @IsString()
    competencesReuises:string
    @IsString()
    niveauEtudesRequises:string
    @IsNumber()
    anneesExperienceMin:number
    @IsString()
    typeContrat:string
    @IsNumber()
    salaireMin:number
    @IsNumber()
    salaireMax:number
    @IsString()
    ville:string


}
