import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Heart } from "./heart.entity";

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {
	async postHeart( user: User, board_id: number): Promise<Heart[]> {
		console.log(user.id, 'user-HeartRepository')
		console.log(board_id, 'board-HeartRepository')

		// const numBoard_id = Number(board_id) 

		const hearts = {
			'user_id': user.id, 
			// 'board_id': numBoard_id
			'board_id': board_id
		};
		await this.save(hearts);
		
		console.log(hearts, 'hearts-HeartRepository')
		
		return this.find({
			where: {
				board_id 
			}
		})
	}
}