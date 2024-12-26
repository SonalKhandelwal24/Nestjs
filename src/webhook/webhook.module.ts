import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Webhook, WebhookSchema } from './schema/webhook.schema';
import { GoogleSheetsModule } from 'src/google-sheets/google-sheets.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema}]),
     GoogleSheetsModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
