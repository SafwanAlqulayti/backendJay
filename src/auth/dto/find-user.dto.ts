import { IsNotEmpty, IsUUID } from "class-validator";

export class FindUserDto {
    @IsUUID()
    @IsNotEmpty()
    id:string
}