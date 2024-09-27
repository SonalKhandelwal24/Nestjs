import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config()

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors({
    origin: "http://192.168.1.64:3001",
    methods: "POST, PATCH, PUT, GET, DELETE",
    credentials: true,    // Allow credentials (cookies)
  });

  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();