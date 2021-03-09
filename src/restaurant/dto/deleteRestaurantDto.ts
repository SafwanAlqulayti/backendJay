import { IsNotEmpty, IsString } from "class-validator";

export class DeleteRestaurantDto {
    @IsNotEmpty()
    @IsString()
    id:string;
}