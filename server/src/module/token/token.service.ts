import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class TokenService extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: process.env.SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    // 토큰 검증
    async validate(payload) {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ email })

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    // 토큰안에 들어있는 유저 정보
    async userInfo(req): Promise<{ message: string, data: Object, statusCode: number }> {
        console.log(req.user)
        const { id, email, nickname, userImage, statusMessage, loginMethod, created_at, updated_at } = await req.user
        return {
            message: 'login success', data: {
                userInfo: {
                    id,
                    email,
                    nickname,
                    userImage,
                    statusMessage,
                    loginMethod,
                    created_at,
                    updated_at
                }
            },
            statusCode: 200
        }
    }
}

