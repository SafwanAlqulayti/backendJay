import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    price:string;

    @IsNotEmpty()
    @IsString()
    restaurantId:string

    @IsUUID()
    categoryId:string;

    @IsOptional()
    isAvilable:boolean

}