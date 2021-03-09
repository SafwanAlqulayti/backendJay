import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserRepository} from './auth.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),

  PassportModule.register({ defaultStrategy: 'jwt' }),

  JwtModule.register({
    secret: 'meshari',
    signOptions: {
      expiresIn:36000,
    }
  }),
],

  controllers: [AuthController],
  providers: [AuthService,JwtStrategy] ,
  exports:[AuthService ,    JwtStrategy, // to make available to other modules
    PassportModule]
})
export class AuthModule {}
