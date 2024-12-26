import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, ".." , 'public'));
  app.setBaseViewsDir(join(__dirname, ".." , 'views'));
  app.setViewEngine('hbs');
  
  console.log(process.env.JWT_SECRET)
  await app.listen(3001);
}
bootstrap();
