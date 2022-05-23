import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lock } from './board-state.union';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { UserRepository } from '../user/user.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from '../user/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, // private을 사용하지 않으면 다른 컴포넌트에서 해당 값을 수정할 수 있다.
  ) {}

  // ALL READ (해당 유저의 게시물만 가져오기)
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  // READ(/:id)
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board id ${id}`);
    }
    return found;
  }

  // CREATE
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  // DELETE(/:id)
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board-id ${id}`);
    }
    console.log(result);
  }

  // UPDATE(/:id)
  // 공개 or 비공개
  async lockBoard(id: number, lock: Lock): Promise<Board> {
    const board = await this.getBoardById(id);
    board.lock = lock;
    await this.boardRepository.save(board);
    return board;
  }
}
