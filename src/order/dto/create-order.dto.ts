import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    @IsUUID()
    restaurantId:string;

    @IsNotEmpty()
    @IsUUID()
    userId:string;
}
