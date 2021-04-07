import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteRestaurantDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id:string;
}