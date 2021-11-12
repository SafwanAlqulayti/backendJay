import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateMealDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    price:string;


    @IsNotEmpty()
    @IsString()
    image:string


    @IsUUID()
    @IsNotEmpty()
    mealId

    @IsOptional()
    isAvilable:boolean

}