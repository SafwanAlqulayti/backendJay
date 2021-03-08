import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';

const phone = require('phone');

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(createAuthDto: CreateAuthDto) {
    const { email, userName, phoneNumber, password } = createAuthDto;
    const user = new User();
    user.email = email;
    user.user_name = userName;
    user.phone_number = phone(phoneNumber, 'SAU')[0];
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.user_role = UserRole.USER;
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return true;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.findOne({ email: email });

    if (user) {
      let x = await user.validateLogin(password);
      if (x) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
