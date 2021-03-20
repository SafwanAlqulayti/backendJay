import { IsNotEmpty, IsString } from "class-validator";


export class CreateRestaurantCashireDto {

    @IsNotEmpty()
    user_name:string;


    @IsNotEmpty()
    password:string;



}




