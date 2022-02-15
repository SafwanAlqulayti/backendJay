import { IsString, IsUUID } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  name;

  @IsString()
  order;
}
