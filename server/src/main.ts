/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'https://www.pickshareapp.com',
      'http://www.pickshareapp.com',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
