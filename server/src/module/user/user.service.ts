import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/singup-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private token: JwtService,
  ) {}

  async getEmailCheck(id: string): Promise<object> {
    const emailcheck = await this.userRepository.findOne({ email: id });
    if (emailcheck) {
      return { message: '이미 사용중인 이메일입니다.' };
    } else {
      return { message: '사용할 수 있는 이메일입니다.' };
    }
  }

  async getNicknameCheck(id: string): Promise<object> {
    const nicknamecheck = await this.userRepository.findOne({ nickname: id });
    if (nicknamecheck) {
      return { message: '이미 사용중인 닉네임입니다.' };
    } else {
      return { message: '사용할 수 있는 닉네임입니다.' };
    }
  }
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.userRepository.createUser(signUpDto);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    console.log(loginDto, 'loginDto');
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ email });
    // console.log('user', user)

    if (user && (await bcrypt.compare(password, user.password))) {
      const {
        id,
        email,
        nickname,
        userImage,
        statusMessage,
        loginMethod,
        created_at,
        updated_at,
      } = user;
      const accessToken = await this.token.sign({
        id,
        email,
        nickname,
        userImage,
        statusMessage,
        loginMethod,
        created_at,
        updated_at,
      });

      return {
        message: 'login success',
        data: { accessToken, loginMethod },
        statusCode: 200,
      };
    } else {
      throw new UnauthorizedException('invalid user information');
    }
  }
}
