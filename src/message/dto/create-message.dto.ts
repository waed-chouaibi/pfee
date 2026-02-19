import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateMessageDto {
    @IsString()
    contenu:string
    @IsDate()
    @Type(()=>Date)
    dateEnvoi:Date

    @IsOptional()
    @IsObject()
    emetteur:Utilisateur

    @IsBoolean()
    lu:boolean
}
