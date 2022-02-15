import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  kind: string;

  @IsNotEmpty()
  @IsString()
  rate: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  @IsString()
  Bucket: string;

  @IsNotEmpty()
  @IsString()
  openHour: string;

  @IsNotEmpty()
  @IsString()
  closeHour: string;
}
