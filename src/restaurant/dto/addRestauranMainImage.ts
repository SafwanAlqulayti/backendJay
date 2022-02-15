import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddResturantMainImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  restaurantId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bucket: string;
}
