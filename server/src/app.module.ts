import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './module/board/board.module';
import { AppController } from './app.controller';
import { UserModule } from './module/user/user.module';
import { TokenModule } from './module/token/token.module';
import { HeartModule } from './module/heart/heart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    UserModule,
    TokenModule,
    HeartModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
