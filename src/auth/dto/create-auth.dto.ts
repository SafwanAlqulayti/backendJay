import { IsString, Length } from "class-validator";

export class CreateAuthDto{

    email: string;

    userName: string;

    password: string;

    @Length(9,9)
    phoneNumber:string;

}