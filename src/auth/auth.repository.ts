import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from './user-role.enum';
import { SignInDto } from './dto/signIn-auth.dto';

const phone = require('phone');

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(createAuthDto: CreateAuthDto) {
    const { email, userName, phoneNumber, password } = createAuthDto;
    let user = new UserEntity()
    user.email = email;
    user.user_name = userName;
    user.phone_number = phone(phoneNumber, 'SAU')[0];
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
   user.user_role = createAuthDto.userRole;
    try {
      await this.save(user);
    } catch (error) {
      (error);
      throw new BadRequestException();
    }

    
    return user.user_name;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(createAuthDto: SignInDto) {
    const { email, password } = createAuthDto;
    const UserEntity = await this.findOne({ email: email });

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
}
