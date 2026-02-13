import { IsBoolean, IsDate, IsString } from "class-validator";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateMessageDto {
    @IsString()
    contenu:string
    @IsDate()
    dateEnvoi:Date
    
    emetteur:Utilisateur

    @IsBoolean()
    lu:boolean
}
