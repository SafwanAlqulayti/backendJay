import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    price:string;

    @IsNotEmpty()
    @IsString()
    category:string;

    @IsOptional()
    isAvilable:boolean
}