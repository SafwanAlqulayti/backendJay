import { IsString } from 'class-validator';
import { DeleteOrderCategoryDetailDto } from './delete-order-category-detail.dto';

export class UpdateOrderCategoryDetailDto extends DeleteOrderCategoryDetailDto {
  @IsString()
  name: string;

  @IsString()
  price: string;
}
