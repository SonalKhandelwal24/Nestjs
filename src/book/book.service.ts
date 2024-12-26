import { Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
 
    public books : BookDTO [] = [];

    //add book
    addBookService(book : BookDTO) : string {
        this.books.push(book);
        return "Books has been added successfully"
    }

    //update book
    updateBookService(book : BookDTO) : string {
        let index = this.books.findIndex((currentBook) => currentBook.id === book.id);
        this.books[index] = book;
        return "Book updated"
    }

    //remove book
    removeBookService(bookId : string) : string {
        this.books = this.books.filter((book) => book.id !== bookId);
        return "Book deleted"
    }

    //find all book
    findAllBookService() : BookDTO[] {
        return this.books;
    }

}
