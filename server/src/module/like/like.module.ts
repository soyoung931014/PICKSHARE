import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { UserModule } from '../user/user.module'
import { BoardModule } from '../board/board.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository]), UserModule, BoardModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
    /* JwtModule.register({
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60
      }
    }) */
  ],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule { }
