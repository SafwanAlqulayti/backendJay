import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(9,9)
    phoneNumber:string;

}