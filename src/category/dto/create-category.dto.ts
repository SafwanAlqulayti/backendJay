import { IsString, IsUUID } from "class-validator";

export class CreateCategoryDto {


@IsString()
name:string;

@IsString()
order:string

@IsUUID()
restaurantEntity:string
}
