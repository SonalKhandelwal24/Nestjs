import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookMiddleware } from './book.middleware';

@Module({
  imports : [],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookMiddleware).forRoutes('book');
  }
}
