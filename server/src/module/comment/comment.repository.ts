import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    id: number,
    createCommentDto: CreateCommentDto,
    board_id: number,
  ): Promise<object> {
    try {
      const { text } = createCommentDto;
      const createComment = await this.create({
        text,
        user_id: id,
        board_id,
      });
      await this.save(createComment);
      return { data: createComment, statusMessage: '댓글 생성 성공' };
    } catch (error) {
      console.log(error);
    }
  }
}
