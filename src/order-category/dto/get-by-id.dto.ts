import { UUID } from 'aws-sdk/clients/inspector';
import { IsUUID } from 'class-validator';

export class GetByIdDto {
  @IsUUID('all')
  mealId: UUID;
}
