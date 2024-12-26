import { Controller, Get, Post, Body } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Get('read')
  async readSheet() {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SPREADSHEET_RANGE;
    const data = await this.googleSheetsService.readSheet(spreadsheetId, range);
    return { data };
  }

  @Post('write')
  async writeSheet(@Body() body: { values: any[] }) {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SPREADSHEET_RANGE; 
    const data = await this.googleSheetsService.updateSheetData(spreadsheetId, range, body.values);
    return { success: true, data };
  }

  @Post('append')
  async appendToSheet(@Body() body: { values: any[] }) {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID; 
    // const range = process.env.GOOGLE_SPREADSHEET_RANGE;
    const data = await this.googleSheetsService.appendToSheet(spreadsheetId, body.values);
    return { success: true, data };
  }
}
