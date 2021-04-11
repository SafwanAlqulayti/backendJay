import { UUID } from "aws-sdk/clients/inspector";
import { IsUUID } from "class-validator";

export class GetById {

@IsUUID('all')
restaurantId:string
}
