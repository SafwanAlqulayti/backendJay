   
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/signIn-auth.dto';
import { PhoneNumberDto } from './dto/phone-number-validation.dto';
import { SendOTP } from './dto/send-OTP.dto';
const phone = require('phone');





@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(createAuthDto: CreateAuthDto) {
    return this.UserRepository.signUp(createAuthDto);
  }

  async signIn(
    CreateAdminDto: SignInDto,): Promise<{ accessToken: string }> {


    const User = await this.UserRepository.signIn(CreateAdminDto);

    if (User.IsActive == false) {
      throw new BadRequestException('Please sign up')
    }
    if (User.email === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email: User.email, id: User.id, role: User.userRole };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  findAll() {// for admin only
    return `This action returns all auth`;
  }

  async findOne(id) {
    return await this.UserRepository.findOne({ id: id })
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }




  async checkOTP(phoneNumberDto: PhoneNumberDto) {

    let user = await this.UserRepository.findOne({ email: phoneNumberDto.email })

    if (user.verifyCode != phoneNumberDto.code) {
      throw new BadRequestException('Plese try again');
    } else {
      user.IsActive = true;
      this.UserRepository.save(user);
      return { message: true }
    }

  }

 async checkOTPByEmail(email, code){
    let user = await this.UserRepository.findOne({ email: email })

    if (user.verifyCode != code) {
      throw new BadRequestException('Plese try again');
    } else {
      return { message: true }
    }

  }

  async sendOTP(sendOTP: SendOTP) {
   let phoneNumber = phone(sendOTP.phoneNumber, 'SAU')[0];

    let user = await this.UserRepository.findOne({ phoneNumber: phoneNumber })

    if(!user){
      throw new BadRequestException('Please Sign Up');
    }
    user.verifyCode = (Math.floor(1000 + Math.random() * 9000)).toString();

    await this.UserRepository.save(user);

    this.UserRepository.otpPhoneNumber(phoneNumber, user.verifyCode);

    return {message:'success',email:user.email}
  }



}
