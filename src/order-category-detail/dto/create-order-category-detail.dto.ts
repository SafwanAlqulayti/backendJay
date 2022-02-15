import { IsString } from 'class-validator';

export class CreateOrderCategoryDetailDto {
  @IsString()
  name: string;

  @IsString()
  price: string;
}
