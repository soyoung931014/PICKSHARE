import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    user: User,
    createCommentDto: CreateCommentDto,
    board_id: number,
  ): Promise<Comment> {
    const { text } = createCommentDto;
    const createComment = this.create({
      text,
      user,
      board_id,
    });
    await this.save(createComment);
    return;
  }
}
