import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { BoardRepository } from '../board/board.repository';
import { HeartRepository } from '../heart/heart.repository';
import { FollowRepository } from '../follow/follow.repository';
import { CommentRepository } from '../comment/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      BoardRepository,
      HeartRepository,
      FollowRepository,
      CommentRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [MypageService],
  controllers: [MypageController],
})
export class MypageModule {}
