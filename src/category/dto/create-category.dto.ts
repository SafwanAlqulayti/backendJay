import { IsString } from "class-validator";

export class CreateCategoryDto {


@IsString()
name:string;

@IsString()
order:string

@IsString()
restaurantEntity:string



}
