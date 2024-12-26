import { FirestoreController } from './firebase.controller';
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirestoreService } from './firebase.service';

@Module({
  controllers: [FirestoreController],
  providers: [
    FirestoreService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            project_id: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN', FirestoreService],
})
export class FirestoreModule { }  
