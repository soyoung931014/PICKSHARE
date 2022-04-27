import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './module/board/board.module';
import { AppController } from './app.controller';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
