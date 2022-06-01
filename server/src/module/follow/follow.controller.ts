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

  //팔로우 하기
  //팔로우 목록 가져오기
  //팔로우 삭제
  //팔로잉 목록 가져오기

  @Post()
  @UseGuards(AuthGuard())
  postFollowing(
    @GetUser() user: User,
    @Body('followingNickname') followingNickname: string,
  ): Promise<Follow[]> {
    return this.followService.postFollowing(user, followingNickname);
  }

  @Get('/following')
  getFollowingList(
    @Query('nickname') nickname: string,
  ): Promise<Follow[]> {
    return this.followService.getFollowingList(nickname);
  }

  @Delete()
  @UseGuards(AuthGuard())
  cancelFollowing(
    @GetUser() user: User,
    @Query('followingNickname') followingNickname: string,
  ): Promise<void> {
    return this.followService.cancelFollowing(user, followingNickname);
  }

  @Get('/follower')
  getFollowerList(
    @Query('nickname') nickname: string,
  ): Promise<Follow[]> {
    return this.followService.getFollowerList(nickname);
  }

  @Get('/follow')
  @UseGuards(AuthGuard())
  getFollowOrNot(
    @GetUser() user: User,
    @Query('userNickname') userNickname: string,
  ): Promise<boolean> {
    return this.followService.getFollowOrNot(user, userNickname);
  }
}
