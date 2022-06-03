import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
    board: Board,
  ): Promise<Comment> {
    const { text } = createCommentDto;
    const createComment = this.create({
      text,
      user,
      board,
    });
    await this.save(createComment);
    return;
  }
}
