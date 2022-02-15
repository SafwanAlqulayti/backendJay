import { UUID } from 'aws-sdk/clients/inspector';
import { IsUUID } from 'class-validator';

export class DeleteOrderCategoryDto {
  @IsUUID()
  mealId: UUID;
}
