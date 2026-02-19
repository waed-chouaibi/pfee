import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateExperienceDto {
    @IsString()
    poste:string
    @IsString()
    entreprise:string
    @IsDate()
    @Type(()=>Date)
    dateDebut:Date
    @IsDate()
    @Type(()=>Date)
    dateFin:Date
    @IsString()
    description:string
}
