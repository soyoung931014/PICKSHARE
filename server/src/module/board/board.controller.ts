import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Lock } from './board-state.union';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
@UseGuards(AuthGuard()) // 컨트롤러 레벨에서 UseGaurd를 생성하면 모든 메소드에 적용된다.
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 모든 게시물 조회
  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllBoards(user);
  }

  // 특정 게시물 조회
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // 게시물 생성
  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  // 게시물 삭제
  @Delete('/:id')
  // ParseIntPipe: 숫자 형태로 입력이 되지 않을시 Err를 출력하는 내장 함수
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    // @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  // 게시물 공개 OR 비공개
  @Patch('/:id/lock')
  lockBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('lock') lock: Lock,
  ): Promise<Board> {
    return this.boardService.lockBoard(id, lock);
  }
}
