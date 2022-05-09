import { Injectable, NotFoundException } from '@nestjs/common';
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

	async cancelHeart(user: User, board_id: number): Promise<void>{
		const result = await this.heartRepository.delete({user, board_id});

		if(result.affected === 0) {
			throw new NotFoundException(`Can't find Board with board_id ${board_id}`)
		}
	}
}
