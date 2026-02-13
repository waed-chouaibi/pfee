import { IsDate, IsString } from "class-validator";

export class CreateFormationDto {
    @IsString()
    diplome:string
    @IsString()
    etablissement:string
    @IsDate()
    dateDebut:Date
    @IsDate()
    dateFin:Date
    @IsString()
    mention:string
}
