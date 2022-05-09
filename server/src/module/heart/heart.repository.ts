import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Heart } from "./heart.entity";

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {
	async postHeart( user: User, board_id: number): Promise<Heart[]> {
		const hearts = {
			'user_id': user.id, 
			'board_id': board_id
		};
		await this.save(hearts);
		return this.find({
			where: {
				board_id 
			}
		})
	}
}