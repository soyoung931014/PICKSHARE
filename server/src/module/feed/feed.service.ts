import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { User } from '../user/user.entity';
//import { UserRepository } from '../user/user.repository';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    //private userRepository: UserRepository,
  ) {}

  async getAllFeed(): Promise<Board[]> {
    const query = await this.boardRepository.createQueryBuilder('board')
      .select([
        'board.id',
        'board.picture AS contentImg',
        'board.date',
        'user.nickname AS nickname',
        'user.userImage As userImage',
        'COUNT(heart.user_id) AS heartNum'
      ])
      .innerJoin(
        'board.user', 'user'
        )
      .leftJoin(
        'board.hearts', 'heart'
      )
      .where('board.Lock = :lock', {lock: 'UNLOCK'})
      .groupBy('board.id')
      .orderBy('board.id')
      .getRawMany()

    return query;
  }

  async getUserFeed(user_id: Board): Promise<Board[]> {
    return this.boardRepository.find({
      where: {
        lock: 'UNLOCK',
        user_id,
      },
    });
  }

  async getMyFeed(user: User): Promise<Board[]> {
    return this.boardRepository.find({
      where: {
        user_id: user.id,
      },
    });
  }
}
