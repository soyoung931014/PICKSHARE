import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';

@Injectable()
export class FeedService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository
	) {}

    async getAllFeed(
			//pageSize: number
		): Promise<Board[]> {

			return this.boardRepository.find({
				where: { 
					"lock": "UNLOCK"
				},
			})
			//페이지네이션 => 무한스크롤
			// const query = await this.boardRepository.createQueryBuilder('board')
			// 	.where('board.lock = :lock', { lock: "UNLOCK"})
			// 	.take(pageSize);
			// console.log(query);

			// let pageStart = 0;

			// if( pageStart === 0 ){
			// 	pageStart = 1;

			// 	return this.boardRepository.find({
			// 		where: {
			// 			"lock": "UNLOCK"
			// 		},
			// 		take: pageSize
			// 	})
			// } else {
			// 	return this.boardRepository.find({
			// 		where: {
			// 			"lock": "UNLOCK"
			// 		},
			// 		skip: pageSize,
			// 		take: pageSize
			// 	})
			// } 
   		}

	async getUserFeed(user_id: Board): Promise<Board[]> {
		return this.boardRepository.find({
			where: {
				"lock": "UNLOCK",
				"user_id": user_id
			}
		})
	}
}
