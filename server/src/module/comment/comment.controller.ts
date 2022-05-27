import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from '../board/board.entity';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    board: Board,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentDto, user, board);
  }
}
