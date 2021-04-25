import { IsNotEmpty, IsString } from "class-validator";

export class FindRestauranDto {
    @IsString()
    @IsNotEmpty()
    restaurantId:string
}