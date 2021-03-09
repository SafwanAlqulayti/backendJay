import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRestaurantFileDto{
    @IsNotEmpty()
    @IsString()
    bucket:string;

    @IsNotEmpty()
    @IsString()
    restaurantId:string;
}