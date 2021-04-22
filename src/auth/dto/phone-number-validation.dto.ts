import { UUID } from "aws-sdk/clients/inspector";
import {  IsNotEmpty, IsString, Length } from "class-validator";

export class PhoneNumberDto{


    @IsNotEmpty()
    userId:UUID


    @IsNotEmpty()
    @IsString()
    code:string;

    // @IsString()
    // @IsNotEmpty()
    // @Length(9,9)
    // phoneNumber:string;







}
