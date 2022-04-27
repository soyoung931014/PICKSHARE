import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('token')
export class TokenController {
    constructor(private token: TokenService) { }

    @Get()
    @UseGuards(AuthGuard())
    validate(@Req() req): any {
        console.log(req, 'req')
        return this.token.userInfo(req)
    }
}
