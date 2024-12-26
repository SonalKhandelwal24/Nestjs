import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CatsModule,
    // MongooseModule.forRoot('mongodb+srv://sonalkhandelwal:mongodb@cluster0.7taeczq.mongodb.net/animal?retryWrites=true&w=majority&appName=Cluster0')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
