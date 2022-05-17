import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { TokenService } from '../token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 60 * 60
      }
    }),
    TokenModule
  ],
  providers: [UserService, TokenService, PassportModule,],
  controllers: [UserController],
  //exports: [UserRepository]
})
export class UserModule { }
