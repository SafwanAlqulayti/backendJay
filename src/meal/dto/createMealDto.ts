import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    price:string;

    @IsOptional()
    isAvilable:boolean
}