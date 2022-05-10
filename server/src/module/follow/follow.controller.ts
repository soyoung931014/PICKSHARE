import { Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
	constructor( private followService: FollowService) {}
	
	//팔로우 하기
	//팔로우 목록 가져오기
	//팔로우 삭제
	
	//팔로잉 목록 가져오기
	
	@Post('/following')
	@UseGuards(AuthGuard())
	postFollowing(@GetUser() user: User, @Query('followingNickname') followingNickname: string): Promise<Follow[]> {
		return this.followService.postFollowing(user, followingNickname);
	}

	@Get('/following')
	getFollowingList(@Query('followingNickname') followingNickname: string): Promise<Follow[]> {
		return this.followService.getFollowingList(followingNickname);
	}

	@Delete('/following')
	@UseGuards(AuthGuard())
	cancelFollowing(@GetUser() user: User, @Query('followingNickname') followingNickname: string): Promise<void> {
		return this.followService.cancelFollowing(user, followingNickname);
	}

	@Get('/follower')
	getFollowerList(@Query('followingNickname') followingNickname: string): Promise<Follow[]>{
		return this.followService.getFollowerList(followingNickname);
	}



}
