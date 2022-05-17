import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/singup-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private token: JwtService,
  ) {}

  async getEmailCheck(id: string): Promise<boolean> {
    const emailcheck = await this.userRepository.findOne({ email: id });
    if (emailcheck) {
      return true;
    } else {
      return false;
    }
  }

  async getNicknameCheck(id: string): Promise<boolean> {
    const nicknamecheck = await this.userRepository.findOne({ nickname: id });
    if (nicknamecheck) {
      return true;
    } else {
      return false;
    }
  }
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; statusCode: number }> {
    const findUser = await this.userRepository.findOne({
      email: signUpDto.email,
    });
    if (findUser) {
      return { message: '이미 가입된 이메일입니다.', statusCode: 200 };
    } else {
      return this.userRepository.createUser(signUpDto);
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    //console.log(loginDto, 'loginDto');
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ email });
    //console.log(user, '찾은 유저입니다.');
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

      const accessToken = this.token.sign({
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
        data: {
          accessToken: accessToken,
          loginMethod: loginMethod,
        },
        statusCode: 200,
      };
    } else {
      throw new UnauthorizedException('invalid user information');
    }
  }
}
