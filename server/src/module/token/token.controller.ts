import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('token')
export class TokenController {
  constructor(private token: TokenService) {}

  @Get()
  @UseGuards(AuthGuard()) // token validate해서 나온 유저를 헤더에 객체형식으로 넣어줌, 토크이 유효하지 않으면 에러처리도 해줌
  validate(@Req() req): any {
    //console.log(req, 'req');
    return this.token.userInfo(req);
  }
}
