import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './module/board/board.module';
import { AppController } from './app.controller';
import { UserModule } from './module/user/user.module';
import { TokenModule } from './module/token/token.module';
import { HeartModule } from './module/heart/heart.module';
import { CommentModule } from './module/comment/comment.module';
import { FollowModule } from './module/follow/follow.module';
import { FeedModule } from './module/feed/feed.module';
import { MypageModule } from './module/mypage/mypage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    TokenModule,
    MypageModule,
    FeedModule,
    BoardModule,
    CommentModule,
    FollowModule,
    HeartModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
