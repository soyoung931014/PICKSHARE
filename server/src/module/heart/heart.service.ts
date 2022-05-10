import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Heart } from './heart.entity';
import { HeartRepository } from './heart.repository';

@Injectable()
export class HeartService {
	constructor(
		@InjectRepository(HeartRepository)
		private heartRepository: HeartRepository,
	) {}

	postHeart(user: User, board_id: number): Promise<number>{
		return this.heartRepository.postHeart(user, board_id)
	}

	async cancelHeart(user: User, board_id: number): Promise<Heart[]>{
		const result = await this.heartRepository.delete({user, board_id});

		if(result.affected === 0) {
			throw new NotFoundException(`Can't find Board with board_id ${board_id}`)
		}

		return this.heartRepository.find({
			where: {
				board_id
			}
		})
	}
}
