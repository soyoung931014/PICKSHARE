import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    './dist/module/user/user.entity.js',
    './dist/module/board/board.entity.js',
    './dist/module/heart/heart.entity.js',
    './dist/module/comment/comment.entity.js',
    './dist/module/follow/follow.entity.js',
    './dist/module/comment/comment.entity.js',
  ],
  synchronize: true,
  logging: false,
};
