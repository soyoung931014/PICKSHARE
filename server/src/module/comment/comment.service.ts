import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  // CREATE 댓글 생성
  // createComment(
  //   createCommentDto: CreateCommentDto,
  //   user: User,
  //   board: Board,
  // ): Promise<Comment> {
  //   return this.commentRepository.createComment(createCommentDto, user, board);
  // }

  createComment(
    user: User,
    createCommentDto: CreateCommentDto,
    board_id: number,
  ): Promise<Comment> {
    return this.commentRepository.createComment(user, createCommentDto, board_id);
  }

  async commentAmount(board_id:number): Promise<number>{
    const amount = await this.commentRepository.find({
      where: {
        board_id,
      }
    })
    return amount.length;
  }
}
