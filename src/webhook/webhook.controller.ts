import { Controller, Post, Body, HttpCode, Get, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(@Body() body: { name:string, phone_number: string, email: string }) {
    const { name, phone_number, email } = body;
    const response = await this.webhookService.saveWebhookData(name, phone_number, email);
    return response;
  }

  @Post('/login')
  @HttpCode(200)
  async handleWebhookLogin(@Body() body: {phone_number: string; }) {
    const { phone_number } = body;
    const response = await this.webhookService.authenticateUser( phone_number );
    return response;
  }

  @Get()
  async fetchWebhookData() {
    const data = await this.webhookService.fetchWebhookData();
    return { success: true, data };
  }
 
}
