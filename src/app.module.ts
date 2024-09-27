import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { LoggingInterceptor } from './interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3001'],
  credentials: true,
}

@Module({
  imports: [ConfigModule.forRoot({isGlobal : true, envFilePath : '.env'}),
    UserModule,
    MongooseModule.forRoot('mongodb+srv://sonalkhandelwal:mongodb@cluster0.7taeczq.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0'),
    AttendanceModule, JwtModule.register({
      secret: "key",
      signOptions: { expiresIn: '60s' },
    }), AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ]
})

export class AppModule { }

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes('*');
//   }

// }
