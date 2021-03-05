import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsString, Length, Matches, Max, Min, MinLength } from "class-validator";


export class CreateAuthDto {

    @IsEmail()
    email: string;

    userName: string;

    @Length(10,10)
    phoneNumber :string;

    password: string;

    userKind:string;

}
