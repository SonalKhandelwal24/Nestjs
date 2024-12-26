import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { GoogleSheetsController } from './google-sheets/google-sheets.controller';
import { ConfigModule } from '@nestjs/config';
import { FirestoreController } from './firebase/firebase.controller';
import { FirestoreModule } from './firebase/firebase.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }),
    // MongooseModule.forRoot('mongodb+srv://sonalkhandelwal:mongodb@cluster0.7taeczq.mongodb.net/Webhook?retryWrites=true&w=majority&appName=Cluster0'),
    // WebhookModule,
    // GoogleSheetsModule,
    FirestoreModule,
  ],
  controllers: [AppController, FirestoreController
    // GoogleSheetsController
  ],
  providers: [AppService],
})
export class AppModule {}
