import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([FollowRepository]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [FollowService],
  controllers: [FollowController]
})
export class FollowModule {}
