import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { NotificationType } from "../entities/notification.entity";
import { Type } from "class-transformer";

export class CreateNotificationDto {
    @IsString()
    titre:string
    @IsString()
    contenu:string
    @IsEnum(NotificationType)
  notification: NotificationType;
  @Type(()=>Date)
    @IsDate()
    dateEnvoi:Date
    @IsBoolean()
    lu:boolean
    @IsNumber()
    @IsOptional()
    entreprise: number
}
