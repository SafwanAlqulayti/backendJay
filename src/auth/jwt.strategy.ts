import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./auth.repository";
import { UserEntity } from "src/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'meshari',
            expiresIn: 36000
        })
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {

        const { email } = payload;
        const user = await this.UserRepository.findOne({ email: email })

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;

    }

}