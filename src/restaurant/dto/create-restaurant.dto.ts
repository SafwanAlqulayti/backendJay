import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateRestaurantDto {


    // @IsUUID()
    // id:string

    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsString()
    kind:string;

    @IsNotEmpty()
    @IsString()
    rate:string;
    

    @IsNotEmpty()
    @IsString()
    latitude:string;


    @IsNotEmpty()
    @IsString()
    longitude:string;


    // @IsNotEmpty()
    // @IsString()
    // image:string;


    @IsNotEmpty()
    @IsString()
    Bucket:string

    @IsNotEmpty()
    @IsNumber()
    openHour:number

    @IsNotEmpty()
    @IsNumber()
    closeHour:number
}
