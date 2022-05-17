import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TokenService extends PassportStrategy(Strategy) {
  //PassportStrategy사용이유: JWT Strategy를 사용하기 위해 (passport-jwt Node.js package)
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, // 유효성 검사 후 데이터베이스(UserRepository)에서 데이터를 찾기 위해
  ) {
    super({
      secretOrKey: process.env.SECRET, //토큰 유효한지 체크하기 위해 사용()
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 토큰 검증
  async validate(payload) {
    const { email } = payload;
    const user: User = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('유저 없음');
    }
    return user;
    // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어간다.
  }

  // 토큰 안에 들어있는 유저 정보를 편집해서(비밀번호 빼고) 클라이언트에 보내주는 함수
  async userInfo(
    req,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    //console.log(req.user, '유저');
    const {
      id,
      email,
      nickname,
      userImage,
      statusMessage,
      loginMethod,
      created_at,
      updated_at,
    } = await req.user;
    return {
      message: 'login success',
      data: {
        userInfo: {
          id,
          email,
          nickname,
          userImage,
          statusMessage,
          loginMethod,
          created_at,
          updated_at,
        },
      },
      statusCode: 200,
    };
  }
}
