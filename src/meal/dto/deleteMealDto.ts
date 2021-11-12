import { UUID } from "aws-sdk/clients/inspector";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteMealDto {
    @IsUUID()
    @IsNotEmpty()
    mealId:UUID
}