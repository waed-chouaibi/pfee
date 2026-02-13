import { IsDate, IsString } from "class-validator";

export class CreateCvDto {
    @IsString()
    cvPDF:string
    @IsDate()
    dateCreation:Date
    @IsDate()
    dateDerniereModification:Date
}
