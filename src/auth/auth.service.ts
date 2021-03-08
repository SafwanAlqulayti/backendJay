import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    return this.UserRepository.signUp(createAuthDto);
  }

  async signIn(
    CreateAdminDto: CreateAuthDto,): Promise<{ accessToken: string }> {
    const User = await this.UserRepository.signIn(CreateAdminDto);
    if (User.email === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email: User.email, username: User.user_name };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
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
