import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindRestauranDto {
  @ApiProperty()
  // @IsNotEmpty()
  restaurantId: string;
}
