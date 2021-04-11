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
    image:string

    @IsUUID()
    categoryId

    @IsOptional()
    isAvilable:boolean

}