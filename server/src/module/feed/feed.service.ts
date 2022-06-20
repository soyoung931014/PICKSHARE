import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { User } from '../user/user.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllFeed(): Promise<Board[]> {
      const result =  await this.boardRepository.createQueryBuilder('board')
        .select([
          'board.id AS id',
          'board.picture AS contentImg',
          'board.date AS date',
          'board.createdAt AS createdAt',
          'board.lock AS locked',
          'user.nickname AS nickname',
          'user.userImage As userImage',
          'COUNT(heart.user_id) AS heartNum',
          'COUNT(comment.board_id) AS commentNum',
        ])
        .innerJoin(
          'board.user', 'user'
          )
        .leftJoin(
          'board.hearts', 'heart'
        )
        .leftJoin(
          'board.comments', 'comment'
        )
        .where('board.Lock = :lock', {lock: 'UNLOCK'})
        .groupBy('board.id')
        .orderBy('board.date', 'DESC')
        .getRawMany()

      return result;
  }

  async getUserFeed(nickname: string): Promise<Board[]> {
    const board = await this.getAllFeed();
    return board.filter((el) => el.nickname === nickname);
  }

  async getMyFeed(user: User): Promise<Board[]> {
    const result =  await this.boardRepository.createQueryBuilder('board')
    .select([
      'board.id AS id',
      'board.picture AS contentImg',
      'board.date AS date',
      'board.createdAt AS createdAt',
      'board.title AS title',
      'board.lock AS locked',
      'user.nickname AS nickname',
      'user.userImage As userImage',
      'COUNT(heart.user_id) AS heartNum',
      'COUNT(comment.board_id) AS commentNum',
    ])
    .innerJoin(
      'board.user', 'user'
      )
    .leftJoin(
      'board.hearts', 'heart'
    )
    .leftJoin(
      'board.comments', 'comment'
    )
    // .where('board.Lock = :lock', {lock: 'UNLOCK'})
    .where('board.user = :user', {user: user.id})
    .groupBy('board.id')
    .orderBy('board.date', 'DESC')
    .getRawMany()

  return result;
  }

  // async searchMineByDate(user: User, date: string): Promise<Board[]> {
  //   const searchedBoard = await this.getMyFeed(user);

  //   return searchedBoard.filter((el) => el.date === date);
  // }

  async searchUsersByDate(nickname: string, date: string): Promise<Board[]> {
    const searchedBoard = await this.getUserFeed(nickname);
    return searchedBoard.filter((el) => el.date === date);
  }
}
