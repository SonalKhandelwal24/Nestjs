import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [AdminModule, UserModule, ManagerModule, AuthModule, ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : '.local.env'
  }), 
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService : ConfigService) => ({uri : configService.get('MONGO_URI')}),
    inject: [ConfigService]
  }), BookModule
],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
