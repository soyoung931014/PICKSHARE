import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../user/user.entity';
import { GetUser } from './get-user.decorator';
@Controller('token')
export class TokenController {
    constructor(private token: TokenService) { }

    // @Get()
    // @UseGuards(AuthGuard())
    // validate(@Req() req): any {
    //     console.log(req, 'req')
    //     return this.token.userInfo(req)
    // }

    @Post()
    @UseGuards(AuthGuard())
    validate(@GetUser() user: User): any {
        console.log(user, 'user')
        // return this.token.userInfo(req)
    }
}
