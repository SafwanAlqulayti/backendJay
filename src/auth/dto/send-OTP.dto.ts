import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SendOTP {
  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  phoneNumber: string;
}
