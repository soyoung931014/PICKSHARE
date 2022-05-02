import { EntityRepository, Repository } from "typeorm";
import { Board } from "../board/board.entity";
import { User } from "../user/user.entity";
import { LikeDto } from "./dto/like.dto";
import { Like } from "./like.entity";

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async postLike(userid: string, likeDto: LikeDto): Promise<{ message: 'like success' }> {

    const { user_id, board_id } = likeDto
    await this.save({
      user_id, board_id
    })

    /* const like = this.create({ user, board })


    await this.save(like); */
    return { message: "like success" }
  }

}