import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from '../board/board.entity';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
	//게시글 좋아요 생성
	//게시글 좋아요 삭제
	//게시글 좋아요 갯수 카운트
	constructor(private likeService: LikeService) {}

	@Post()
	// @UseGuards(AuthGuard())
	postLike(
		// @GetUser() user: User,
		@Body('user') user: User,
		@Body('board') board: Board
	): Promise<Like> {
		console.log("board_id", board)
		console.log("user_id", user)
		return this.likeService.postLike(user, board)
	}
}
