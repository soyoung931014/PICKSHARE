import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './module/board/board.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
