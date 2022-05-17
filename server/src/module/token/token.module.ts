import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TokenController } from './token.controller';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService, PassportModule],
})
export class TokenModule {}

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: 'Secret1234',
//       signOptions: {
//         expiresIn: 60 * 60
//       }
//     }),
//     TypeOrmModule.forFeature([UserRepository])
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy], // 현재 어쓰모듈(현재모듈)에서 사용해주려고
//   exports: [JwtStrategy, PassportModule] // 외부의 다른 모듈에서 사용해주려고

// })
