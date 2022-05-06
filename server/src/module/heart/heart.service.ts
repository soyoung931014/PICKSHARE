import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { HeartRepository } from './heart.repository';

@Injectable()
export class HeartService {
	constructor(
		@InjectRepository(HeartRepository)
		private heartRepository: HeartRepository,
	) {}

	postHeart(user: User, board_id: number): Promise<void>{
		console.log(user,'user-HeartService')
		console.log(board_id, 'board-HeartService')
		return this.heartRepository.postHeart(user, board_id)
	}
}
