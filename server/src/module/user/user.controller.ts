import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/singup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    //중복검사(emailcheck)

    //중복검사(nickcheck)

    // 일반 회원가입
    @Post('/signup')
    signup(@Body() signUpDto: SignUpDto): Promise<{ message: string, statusCode: number }> {
        return this.userService.signUp(signUpDto);
    }

    // 일반 로그인
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ message: string, data: Object, statusCode: number }> {
        return this.userService.login(loginDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // //이 부분이 있어야 req안에 user객체가 존재할 수 있음.
    // test1(@Req() req) {
    //     console.log('test2', req);
    // }


}
