import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateConversationDto {
    @IsDate()
    @Type(()=>Date)
    dateCreation:Date

}
