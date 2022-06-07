import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
    @Body('board_id') board_id: number,
  ): Promise<Comment> {
    return this.commentService.createComment(user, createCommentDto, board_id);
  }

  @Get()
  commentAmount(
    @Query('board_id') board_id: number
  ): Promise<number> {
    return this.commentService.commentAmount(board_id)
  }
}
