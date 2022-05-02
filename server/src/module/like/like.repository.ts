import { EntityRepository, Repository } from "typeorm";
import { Board } from "../board/board.entity";
import { User } from "../user/user.entity";
import { Like } from "./like.entity";

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async postLike(
    user: User,
    board: Board
    ): Promise<Like> {
			const like = this.create({
				user, board
			})

      await this.save(like);
      return like;
  }
}