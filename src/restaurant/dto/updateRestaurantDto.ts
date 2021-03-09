import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    id:string;

    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    kind:string;
}