import { Injectable } from '@nestjs/common';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';

@Injectable()
export class WebhookService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  async saveWebhookData(name: string, phone_number: string, email?: string) {
    console.log('Saving webhook data to Google Sheets:', {name, phone_number, email });
    const result = await this.authenticateUser(phone_number);
    if (result.phone_number_exists) {
      console.log('Phone number is already present with email:', result.email);
      return { success: false, message: `Phone number ${phone_number} is already registered with email: ${result.email}`, isValid: true };
    } else if (result.message === "Phone number is not registered") {
      await this.addToGoogleSheets(name, phone_number, email);
      return { success: true, message: 'Webhook data saved successfully' };
    } else {
      console.error('Unexpected result:', result);
      throw new Error(result.error || 'Unexpected error');
    }
    
  }

  // authenticate using user id 
  async authenticateUser(phone_number: string): Promise<{ email?: string; error?: string; message?: string; phone_number_exists?: boolean }> {
    const spreadsheetId = '1DQ16eHGLo9X35FWo97mlnCBkyBog2bTsUIvfidyhrfs';
    const range = 'Sheet1!A:D';

    try {
      // Fetch rows from the spreadsheet
      const rows = await this.googleSheetsService.readSheet(spreadsheetId, range);

      // Check if the phone number exists
      for (const row of rows) {
        const [existingName, existingPhoneNumber, existingEmail] = row; 
        if (existingPhoneNumber === phone_number) {
          return { email: existingEmail, phone_number_exists: true }; 
        }
      }

      // Phone number not found
      return { message: "Phone number is not registered" };
    } catch (error) {
      console.error('Error reading spreadsheet:', error.message);
      throw new Error('Failed to authenticate user');
    }
  }

  // Helper method to append data to Google Sheets
  private async addToGoogleSheets(name: string, phone_number: string, email: string) {
    const spreadsheetId = process.env.SPREADSHEET_ID || '1DQ16eHGLo9X35FWo97mlnCBkyBog2bTsUIvfidyhrfs';
    const range = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A2:D';

    const values = [
      [name || 'N/A' , phone_number || 'N/A', email || 'N/A', new Date().toLocaleDateString()],
    ];

    try {
      // Append data to Google Sheets
      await this.googleSheetsService.appendToSheet(spreadsheetId, values);
      console.log('Webhook data appended to Google Sheets');
    } catch (error) {
      console.error('Error appending data to Google Sheets:', error.message);
      throw new Error('Failed to append data to Google Sheets');
    }
  }

  async fetchWebhookData(name?:string, phone_number?: string, email?: string) {
    const spreadsheetId = '1DQ16eHGLo9X35FWo97mlnCBkyBog2bTsUIvfidyhrfs';
    const range = 'Sheet1!A2:D'; 

    try {
      const rows = await this.googleSheetsService.readSheet(spreadsheetId, range);

       // Return all data without filtering
        return rows.map((row: any[]) => ({
          name: row[0] || 'N/A',
          phone_number: row[1] || 'N/A',
          email: row[2] || 'N/A',
          createdAt: row[3] || new Date().toISOString(),
        }));

    } catch (error) {
      console.error('Error fetching webhook data:', error);
      throw new Error(`Error fetching webhook data: ${error.message}`);
    }
  }

}
