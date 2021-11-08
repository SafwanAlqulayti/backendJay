import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { SignInDto } from './dto/signIn-auth.dto';
const readline = require('readline');
var TeleSignSDK = require('telesignsdk');

const phone = require('phone');

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async signUp(createAuthDto: CreateAuthDto) {

    let findUser = await this.findOne({ email: createAuthDto.email })

    if (findUser) {
      if (findUser.IsActive == true) {
        throw new BadRequestException('You are already have an account');
      }
    }
    if (findUser) {
      findUser.verifyCode = (Math.floor(1000 + Math.random() * 9000)).toString()
      await this.save(findUser);
      await this.otpPhoneNumber(findUser.phoneNumber, findUser.verifyCode);

    } else {
      const { email, userName, phoneNumber, password } = createAuthDto;
      let user = new UserEntity()
      user.email = email;
      user.userName = userName;
      user.phoneNumber = phone(phoneNumber, 'SAU')[0];
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.userRole = createAuthDto.userRole;
      const verifyCode = Math.floor(1000 + Math.random() * 9000);
      user.verifyCode = verifyCode.toString();

      try {
        await this.save(user);
      } catch (error) {
        (error);
        throw new BadRequestException();
      }
      await this.otpPhoneNumber(user.phoneNumber, user.verifyCode);
      return { userName: userName, userId: user.id };
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(createAuthDto: SignInDto) {
    const { email, password } = createAuthDto;
    const UserEntity = await this.findOne({ email: email });
    console.log('here')
    if (UserEntity) {
      let x = await UserEntity.validateLogin(password);
      if (x) {
        return UserEntity;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }




  async otpPhoneNumber(phonenumber: any, verifyCode) {
    //  let user =await this.findOne(PhoneNumberDto.userId);

    const customerId = process.env.CUSTOMER_ID;
    const apiKey = process.env.APIKEY;
    const rest_endpoint = process.env.REST_ENDPOINT;

    const timeout = 20 * 1000; // 20 secs
    const client = new TeleSignSDK(customerId,
      apiKey,
      rest_endpoint,
      timeout
    );

    const phoneNumber = phonenumber;
    const messageType = "ARN";
    const message = "Your code is " + verifyCode;


    function messageCallback(error, responseBody) {
      if (error) {
        console.error("Unable to send message. " + error);
      }
    }
    client.sms.message(messageCallback, phoneNumber, message, messageType);
  }
}
