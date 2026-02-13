import { IsEnum, IsString } from "class-validator";
import { CompetenceType } from "../entities/competence.entity";

export class CreateCompetenceDto {
    @IsString()
    nom:string
    @IsEnum(CompetenceType)
    niveau:CompetenceType
    @IsString()
    description:string
    @IsString()
    categorie:string
}
