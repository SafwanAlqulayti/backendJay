import { ApiProperty } from '@nestjs/swagger';
export class UserLatLongDto {
  @ApiProperty({required:false})
  lat: string;
  @ApiProperty({required:false})
  long: string;
  @ApiProperty({required:false})
  name: string;
}
