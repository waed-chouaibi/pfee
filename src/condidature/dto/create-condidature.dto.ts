import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateCondidatureDto {
    @IsDate()
    dateCandidature:Date
    @IsString()
    statut:string
    @IsNumber()
    scoreCompatibilite:number
}
