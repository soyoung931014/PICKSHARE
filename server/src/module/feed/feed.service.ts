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
        'board.id AS id',
        'board.picture AS contentImg',
        'board.date AS date',
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

  async getUserFeed(nickname: string): Promise<Board[]> {
    const findNickfeed =  await this.boardRepository.find({
      where:{
        nickname,
        lock: 'UNLOCK',
      }
    })

    return findNickfeed;
  }

  async getMyFeed(user: User): Promise<Board[]> {
    return this.boardRepository.find({
      where: {
        user_id: user.id,
      },
    });
  }
}
