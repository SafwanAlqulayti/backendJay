import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
