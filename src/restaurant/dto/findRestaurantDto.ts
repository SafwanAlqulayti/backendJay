import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindRestauranDto {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;
}
