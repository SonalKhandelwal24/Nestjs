import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private db: admin.firestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
    this.db = admin.firestore();
  }

  async saveContactForm(data: { name: string; email: string; phone_number: string }): Promise<void> {
    try {
      // Check if the phone number already exists in the 'contacts' collection
      const existingContactSnapshot = await this.db.collection('contacts').where('phone_number', '==', data.phone_number).get();

      if (!existingContactSnapshot.empty) {
        // If the phone number already exists, throw an error or handle accordingly
        console.log('Phone number already exists.');
        throw new Error('Phone number already exists.');
      }

      // Save the new contact if the phone number is unique
      console.log('Saving data to Firestore:', data);
      const collection = this.db.collection('contacts');
      await collection.add(data);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async getContactDetails(){
    try {
      const snapshot  = await this.db.collection('contacts').get();
      if(snapshot.empty) {
        console.log('No documents found.');
        return [];
      }
      const contacts = snapshot.docs.map(doc => doc.data());
      console.log('Data retrieved successfully:', contacts);
      return contacts;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw new Error('Error retrieving data');
    }
  }
}
