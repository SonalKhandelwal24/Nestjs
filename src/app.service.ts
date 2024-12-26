import { Injectable } from '@nestjs/common';
import { BookModel } from './book.model';

//MODEL
@Injectable()
export class AppService {

  public books: BookModel[] = [
    { title: "Harry Potter", author: "J. K. Rowling", published: 2013, copies: 5000 },
    { title: "Vampire Diaries", author: "L. K. Smith", published: 2004, copies: 4000 },
    { title: "Harry Potter Deathly Hollows", author: "J. K. Rowling", published: 2019, copies: 6000 },
  ]

  getAllBooks(): BookModel[] {
    return this.books;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
