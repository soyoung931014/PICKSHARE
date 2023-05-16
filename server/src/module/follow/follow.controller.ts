import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  //팔로우 목록 가져오기
  //팔로우 삭제
  
  //유저가 다른 닉네임을 팔로우 하기
  @Post()
  @UseGuards(AuthGuard())
  postFollowing(
    @GetUser() user: User,
    @Body('nickname') nickname: string,
  ): Promise<Follow[]> {
    return this.followService.postFollowing(user, nickname);
  }
    
  //유저가 팔로우하고 있는 다른 유저들의 목록 조회
  @Get('/following')
  getFollowingList(@Query('nickname') nickname: string): Promise<Follow[]>
  {
    return this.followService.getFollowingList(nickname);
  }

  //유저가 특정 닉네임의 팔로우 중지
  @Delete()
  @UseGuards(AuthGuard())
  cancelFollowing(
    @GetUser() user: User,
    @Query('nickname') nickname: string,
  ): Promise<void> {
    return this.followService.cancelFollowing(user, nickname);
  }

  //
  @Get('/follower')
  getFollowerList(@Query('nickname') nickname: string): Promise<Follow[]> {
    return this.followService.getFollowerList(nickname);
  }

  //유저가 특정 닉네임을 팔로우하고있는지 아닌지 판별
  @Get('/follow')
  @UseGuards(AuthGuard())
  getFollowOrNot(
    @GetUser() user: User,
    @Query('nickname') nickname: string,
  ): Promise<boolean> {
    return this.followService.getFollowOrNot(user, nickname);
  }
}
