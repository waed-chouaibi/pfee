import { IsDate, IsString } from "class-validator";

export class CreateExperienceDto {
    @IsString()
    poste:string
    @IsString()
    entreprise:string
    @IsDate()
    dateDebut:Date
    @IsDate()
    dateFin:Date
    @IsString()
    description:string
}
