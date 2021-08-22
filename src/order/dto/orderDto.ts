import { IsNotEmpty, IsString } from "class-validator";
export class OrderDetailDto {
 @IsNotEmpty()
 @IsString()
 orderId:string;   
}