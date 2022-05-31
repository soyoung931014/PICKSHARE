import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from '../feed/feed.module';
import { FeedService } from '../feed/feed.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository, UserRepository]),
    FeedModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BoardController],
  providers: [BoardService, FeedService],
})
export class BoardModule {}
