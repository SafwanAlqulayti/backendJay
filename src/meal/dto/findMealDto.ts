import { IsNotEmpty, IsString } from "class-validator";

export class FindMealDto {
    @IsNotEmpty()
    @IsString()
    mealId:string
}