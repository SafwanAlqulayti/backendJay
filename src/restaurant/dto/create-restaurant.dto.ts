import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  kind: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  latitude: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longitude: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Bucket: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  openHour: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  closeHour: string;
}
