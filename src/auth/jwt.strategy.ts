import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../auth/entities/user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./auth.repository";
import * as config from 'config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'meshari',
            expiresIn: 3600
        })
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { email } = payload;
        const user = await this.UserRepository.findOne({ email: email })

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;

    }

}