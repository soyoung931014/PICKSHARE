import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Lock } from './board-state.union';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // @Get()
  // getAllBoards(@GetUser() user: User): Promise<Board[]> {
  //   return this.boardService.getAllBoards(user);
  // }
  
  //사진으로 보드 정보 가져오기
  @Get()
  findBoardByPic(@Query('picture') picture: string): Promise<Board[]> {
    return this.boardService.findBoardByPic(picture)
  }

  // 특정 게시물 조회
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // 게시물 생성
  @Post()
  @UseGuards(AuthGuard())
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  // 게시물 삭제
  @Delete('/:id')
  // ParseIntPipe: 숫자 형태로 입력이 되지 않을시 Err를 출력하는 내장 함수
  @UseGuards(AuthGuard())
  deleteBoard(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.boardService.deleteBoard(user, id);
  }

  // 게시물 공개 OR 비공개
  @Patch('/:id/lock')
  @UseGuards(AuthGuard())
  lockBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('lock') lock: Lock,
  ): Promise<Board> {
    return this.boardService.lockBoard(id, lock);
  }

  @Patch('/:id/edit')
  @UseGuards(AuthGuard())
  editBoard(
    @Param('id', ParseIntPipe) id: number,//보드 아이디
    @GetUser() user: User,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardService.editBoard(id, user, createBoardDto);
  }
}
