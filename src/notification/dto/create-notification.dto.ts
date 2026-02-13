import { IsBoolean, IsDate, IsEnum, IsString } from "class-validator";
import { NotificationType } from "../entities/notification.entity";

export class CreateNotificationDto {
    @IsString()
    titre:string
    @IsString()
    contenu:string
    @IsEnum(NotificationType)
  notification: NotificationType;
    @IsDate()
    dateEnvoi:Date
    @IsBoolean()
    lu:boolean
}
