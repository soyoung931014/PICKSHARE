import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { LikeDto } from './dto/like.dto';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
	constructor(
		@InjectRepository(LikeRepository)
		private likeRepository: LikeRepository,
	) { }

	async postLike(userid: string, likeDto: LikeDto): Promise<{ message: string }> {
		console.log(userid, likeDto, 'hihihihihi')
		//return { message: 'success' }
		//Promise<Like>
		//return { id: 3, user: postid, board: boardid }
		return this.likeRepository.postLike(userid, likeDto)
	}
}
