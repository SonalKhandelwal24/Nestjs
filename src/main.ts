import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

// when we use globalMiddleware then use function not class
function globalMiddlewareOne (req : Request, res : Response, next: NextFunction) {
  console.log("This is a first Global Middleware !!");
  next();  
}
function globalMiddlewareTwo (req : Request, res : Response, next: NextFunction) {
  console.log("This is a second Global Middleware !!");
  next();  
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddlewareOne);
  app.use(globalMiddlewareTwo);
  await app.listen(3000);
}
bootstrap();
