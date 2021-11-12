import { uuid } from "aws-sdk/clients/customerprofiles";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { IsUuidArray } from "../custom-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsNotEmpty()
    @IsUUID()
    restaurantId:string;

    @IsNotEmpty()
    @IsUUID()
    userId:string;

    @IsUuidArray()
    @IsNotEmpty()
    mealsIds:string[];

    @IsOptional()
    @IsString()
    note?:string
}
