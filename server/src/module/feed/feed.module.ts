import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { UserModule } from '../user/user.module';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [UserModule, BoardModule],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
