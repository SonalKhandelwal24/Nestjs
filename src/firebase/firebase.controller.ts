import { Controller, Post, Body, Get } from '@nestjs/common';
import { FirestoreService } from './firebase.service';

@Controller('contact')
export class FirestoreController {
  constructor(private readonly firestoreService: FirestoreService) {}

  @Post()
  async submitContactForm(@Body() data: { name: string; email: string; phone_number: string }) {
    await this.firestoreService.saveContactForm(data);
    return { message: 'Contact form submitted successfully' };
  }

  @Get()
  async getContactDetails() {
    return await this.firestoreService.getContactDetails();
  }
}
