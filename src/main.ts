import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: "http://192.168.1.50:3001", 
    methods: ["POST", "PATCH", "PUT", "GET", "DELETE"],
    credentials: true,
  });

  await app.listen(3000); // Listen after enabling CORS
}
bootstrap();
