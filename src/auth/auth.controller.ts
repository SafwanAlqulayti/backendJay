import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PhoneNumberDto } from './dto/phone-number-validation.dto';
import { SendOTP } from './dto/send-OTP.dto';
import { SignInDto } from './dto/signIn-auth.dto'

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signUp')
  createUserAndSendOTPMassege(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signIn')
  signIn(@Body() createAuthDto: SignInDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('/checkOTP')
  checkOTP(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.authService.checkOTP(phoneNumberDto);
  }

  @Post('send-otp')
  sendOTP(@Body() sendOTP: SendOTP) {
    return this.authService.sendOTP(sendOTP)
  }

  @Post('/checkOTP-by-email')
  checkOTPByEmail(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.authService.checkOTPByEmail(phoneNumberDto.email, phoneNumberDto.code)
  }



  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}