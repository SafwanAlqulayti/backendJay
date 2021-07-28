import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { UserRole } from "../user-role.enum";

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


    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole:UserRole;


}