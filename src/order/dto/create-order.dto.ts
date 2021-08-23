import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    @IsUUID()
    restaurantBranchId:string;

    @IsNotEmpty()
    @IsUUID()
    userId:string;

    mealsIds:[string];
}
