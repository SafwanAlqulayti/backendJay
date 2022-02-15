import { IsNotEmpty, IsString } from 'class-validator';

export class AddResturantMainImageDto {
  @IsNotEmpty()
  @IsString()
  restaurantId: string;

  @IsNotEmpty()
  @IsString()
  bucket: string;
}
