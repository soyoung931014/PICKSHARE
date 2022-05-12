import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordCheckDto } from './dto/passwordCheck.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MypageService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // 회원정보 수정
  async updateUserInfo(updateUser: UpdateUserDto, user: any): Promise<object> {
    const userInfo = await this.userRepository.findOne({ email: user.email });
    if (userInfo) {
      const updateUserInfo: object = { ...userInfo, ...updateUser };
      await this.userRepository.save(updateUserInfo);
      return { message: 'update success', statusCode: 200 };
    } else {
      return { message: 'update fail', statusCode: 400 };
    }
  }

  // 회원 탈퇴
  async removeUserInfo(
    user: any,
    passwordDto: PasswordCheckDto,
  ): Promise<object> {
    const userInfo = await this.userRepository.findOne({ email: user.email });
    console.log(userInfo);
    /* 만약 토큰 문제라면, userInfo가 없다면 useGuard에서 {
    "statusCode": 401,
    "message": "Unauthorized"
    }에러 처리남 */
    if (
      userInfo &&
      (await bcrypt.compare(passwordDto.password, userInfo.password))
    ) {
      await this.userRepository.remove(userInfo);
      return { message: 'withdrawal success', statusCode: 200 };
    } else {
      return { message: 'withdrawal fail', statusCode: 400 }; // 올바르지 않은 비밀번호입니다.
    }
  }
}
