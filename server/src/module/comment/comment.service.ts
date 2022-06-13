import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // CREATE 댓글 생성
  // createComment(
  //   createCommentDto: CreateCommentDto,
  //   user: User,
  //   board: Board,
  // ): Promise<Comment> {
  //   return this.commentRepository.createComment(createCommentDto, user, board);
  // }

  async createComment(
    user: User,
    createCommentDto: CreateCommentDto,
    board_id: number,
  ): Promise<object> {
    const { id } = user;
    return this.commentRepository.createComment(id, createCommentDto, board_id);
  }

  async commentAmount(board_id: number): Promise<number> {
    const amount = await this.commentRepository.find({
      where: {
        board_id,
      },
    });
    return amount.length;
  }

  // 해당 보드의 댓글 모두 불러오기
  async getBoardComments(id: number): Promise<object> {
    try {
      const comments = await this.commentRepository.find({ board_id: id });
      console.log(comments);
      if (comments) {
        const user = await Promise.all(
          comments.map(async (el) => {
            return await this.userRepository.findOne({ id: el.user_id });
          }),
        );
        // console.log(user, 'user');
        const result = [];
        for (let i = 0; i < comments.length; i++) {
          const { id, text, created_at, updated_at } = comments[i];
          const { userImage, email, nickname } = user[i];
          const object = {
            userInfo: {
              email,
              nickname,
              userImage,
            },
            comment: {
              id,
              text,
              created_at,
              updated_at,
            },
          };
          result.push(object);
        }
        return {
          statusMessage: `게시글 ${id}번 댓글 불러오기 성공했습니다`,
          data: result,
        };
      } else {
        return { data: null, statusMessage: `댓글 없어요` };
      }
    } catch (error) {
      return error;
    }
  }

  // 선택한 게시글 댓글 수정하기
  async update(
    createCommentDto: CreateCommentDto,
    comment_id: number,
  ): Promise<object> {
    try {
      const comment = await this.commentRepository.findOne({ id: comment_id });
      if (comment) {
        const updateComment = await this.commentRepository.save({
          ...comment,
          text: createCommentDto.text,
        });
        return {
          data: updateComment,
          statusMessage: '수정 완료',
        };
      } else {
        return;
      }
    } catch (error) {
      return { statusMessage: '댓글 수정 서버 에러', data: error };
    }
  }

  // 선택한 게시글 댓글 삭제하기
  async delete(comment_id: number): Promise<object> {
    try {
      const selectComment = await this.commentRepository.findOne({
        id: comment_id,
      });
      if (selectComment) {
        await this.commentRepository.remove(selectComment);
        return { statusMessage: '댓글 삭제 완료' };
      } else {
        return;
      }
    } catch (error) {
      return { statusMessage: '댓글 삭제 서버 에러', data: error };
    }
  }
}
