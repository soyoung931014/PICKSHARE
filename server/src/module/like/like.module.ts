import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { UserModule } from '../user/user.module'
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository]), UserModule, BoardModule],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
