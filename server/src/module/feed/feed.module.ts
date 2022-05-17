import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from '../board/board.repository';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../user/user.repository';
import { HeartRepository } from '../heart/heart.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([HeartRepository]),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [FeedService],
  controllers: [FeedController],
  exports: [FeedService]
})
export class FeedModule {}
