import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from '../board/board.entity';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { LikeDto } from './dto/like.dto';
import { Like } from './like.entity';
import { LikeService } from './like.service';


@Controller('like')
@UseGuards(AuthGuard())
export class LikeController {
	//게시글 좋아요 생성
	//게시글 좋아요 삭제
	//게시글 좋아요 갯수 카운트
	constructor(private likeService: LikeService) { }

	@Post()
	postLike(
		@Req() req,
		@Body() likeDto: LikeDto
		// @GetUser() user: User,
		/* @Body('post_id') postid,
		@Body('board_id') boardid */
	): Promise<{ message: string }> {

		console.log('req', req.user)




		//console.log("board_id", board)
		//console.log("user_id", user)
		return this.likeService.postLike(req.user, likeDto)
	}
}
