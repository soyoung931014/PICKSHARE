import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
	constructor(
		@InjectRepository(LikeRepository) 
		private likeRepository: LikeRepository,
	) {}

	postLike(user: User, board: Board): Promise<Like> {
		return this.likeRepository.postLike(user, board)
	}
}
