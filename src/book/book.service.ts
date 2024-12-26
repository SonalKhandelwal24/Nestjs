import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book';
import { Model } from 'mongoose';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel : Model<BookDocument>) {}
  // BookDocument = Book
  
  create(createBookDto: CreateBookDto) : Promise<Book> {
    const model = new this.bookModel();
    model.title = createBookDto.title;
    model.author = createBookDto.author;
    model.published = createBookDto.published;
    model.copies = createBookDto.copies;
    return model.save();
  }

  findAll() : Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  findOne(id: string) : Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.updateOne({_id : id},
      {title : updateBookDto.title, author : updateBookDto.author, published : updateBookDto.published, copies : updateBookDto.copies}).exec();
  }

  remove(id: string) {
    return this.bookModel.deleteOne({_id : id}).exec();
  }
}
