import { Type } from "class-transformer"
import { IsDate, IsEmail, IsNotEmpty, IsString, Min } from "class-validator"

export class CreateUtilisateurDto {
    @IsString()
    @IsNotEmpty()
    nom:string
    @IsString()
    @IsNotEmpty()
    prenom:string

    @IsEmail()
    @IsNotEmpty()
    email:string

   
    @IsString()
    password:string

    @IsString()
    telephone:string
    @Type(()=>Date)
    @IsDate()
    dateInscription:Date
}
