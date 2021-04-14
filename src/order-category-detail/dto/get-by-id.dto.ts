import { UUID } from "aws-sdk/clients/inspector";
import { IsUUID } from "class-validator";

export class GetByIdOrderCategoryDto{


    @IsUUID('all')
    orderCategoryId:UUID


}