import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';

@Controller('book')
export class BookController {

    constructor( private bookService : BookService ) {}

    @Get('/findAllBooks')
    findAll() : BookDTO [] {
        return this.bookService.findAllBookService();        
    }
    
    @Put('/updateBook')
    updateBook (@Body() bookdto : BookDTO) {
        return this.bookService.updateBookService(bookdto);
    }
    
    @Post('/addBook')
    create (@Body() bookdto : BookDTO ) {
        return this.bookService.addBookService(bookdto);
    }

    @Delete('/deleteBook/:id')
    delete (@Param('id') bookId : string ) {
        return this.bookService.removeBookService(bookId);
    }

}
