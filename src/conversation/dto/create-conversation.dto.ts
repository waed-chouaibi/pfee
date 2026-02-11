import { IsDate, IsString } from "class-validator";

export class CreateConversationDto {
    @IsDate()
    dateCreation:Date

}
