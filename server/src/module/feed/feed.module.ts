import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from '../board/board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    UserModule,
  ],
  providers: [FeedService],
  controllers: [FeedController],
  exports: [FeedService]
})
export class FeedModule {}
