import { UUID } from "aws-sdk/clients/inspector";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderCategoryDto {


    @IsString()
    @IsNotEmpty()
    name:string


    @IsString()
    @IsNotEmpty()
    order:string


    @IsUUID()
    mealId:UUID


}
