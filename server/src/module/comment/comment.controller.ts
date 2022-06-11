import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDateColumn } from 'typeorm';
import { Board } from '../board/board.entity';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // @Post()
  // @UseGuards(AuthGuard())
  // createComment(
  //   @Body() createCommentDto: CreateCommentDto,
  //   board: Board,
  //   @GetUser() user: User,
  // ): Promise<Comment> {
  //   return this.commentService.createComment(createCommentDto, user, board);
  // }
  // 선택한 게시글에 댓글 생성하기
  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
    @Body('board_id') board_id: number,
  ): Promise<object> {
    //console.log(user, 'user');
    return this.commentService.createComment(user, createCommentDto, board_id);
  }

  // 댓글 갯수
  @Get()
  commentAmount(@Query('board_id') board_id: number): Promise<number> {
    return this.commentService.commentAmount(board_id);
  }

  // 선택한 게시글의 댓글을 모두 가져오기
  @Get('/:id')
  getBoardComments(@Param('id') id: number): Promise<object> {
    return this.commentService.getBoardComments(id);
  }

  // 선택한 게시글 댓글 수정하기
  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(
    @Body() createCommentDto: CreateCommentDto,
    @Body('comment_id') comment_id: number,
  ): Promise<object> {
    return this.commentService.update(createCommentDto, comment_id);
  }

  // 선택한 게시글 댓글 삭제하기
  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Body('comment_id') comment_id: number): Promise<object> {
    return this.commentService.delete(comment_id);
  }
}
