import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/singup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    //중복검사(emailcheck)

    //중복검사(nickcheck)

    // 회원가입
    @Post('/signup')
    signup(@Body() signUpDto: SignUpDto): Promise<{ message: string, statusCode: number }> {
        return this.userService.signUp(signUpDto)
    }



}
