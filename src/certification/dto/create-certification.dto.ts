import { IsDate, IsString } from "class-validator";

export class CreateCertificationDto {
    @IsString()
    nom:string
    @IsString()
    organisme:string
    @IsDate()
    dateObtention:Date
    @IsString()
    urlCertificat:string
}
