// 리포지토리는 엔터티 개체와 함께 작동하며
// 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리합니다.
// 데이터베이스에 관련 된 일은 서비스에서 하는게 아닌
// Repository에서 해주시면 됩니다.

import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, picture, pictureMethod, mood, lock, content, date } =
      createBoardDto;

    const board = this.create({
      title,
      user,
      picture,
      pictureMethod,
      mood,
      lock,
      content,
      date,
    });

    await this.save(board);
    return board;
  }
}
