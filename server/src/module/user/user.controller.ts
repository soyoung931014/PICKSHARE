import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/singup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //중복검사(emailcheck)
  @Get('emailcheck/:id')
  emailCheck(@Param('id') id: string): Promise<boolean> {
    return this.userService.getEmailCheck(id);
  }
  //중복검사(nicknamecheck)
  @Get('/nicknamecheck/:id')
  nicknameCheck(@Param('id') id: string): Promise<boolean> {
    return this.userService.getNicknameCheck(id);
  }

  // 일반 회원가입
  @Post('/signup')
  signup(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ message: string; statusCode: number }> {
    return this.userService.signUp(signUpDto);
  }

  // 일반 로그인
  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; data: object; statusCode: number }> {
    return this.userService.login(loginDto);
  }
}