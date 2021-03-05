import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import {User} from './entities/user.entity'
import { exception } from "console";
import {UserRepository} from './auth.repository'


@Injectable()
export class AuthService {
  constructor(private UserRepository:UserRepository){}

 async signUp(createAuthDto: CreateAuthDto) {
   return this.UserRepository.signUp(createAuthDto);
      }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
