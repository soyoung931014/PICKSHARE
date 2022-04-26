import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Lock } from './board-state.union';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 모든 게시물 조회
  @Get()
  getAllContents(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  // 특정 게시물 조회
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // 게시물 생성
  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  // 게시물 삭제
  @Delete('/:id')
  // ParseIntPipe: 숫자 형태로 입력이 되지 않을시 Err를 출력하는 내장 함수
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
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
