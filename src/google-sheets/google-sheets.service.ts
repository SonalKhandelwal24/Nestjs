import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GoogleSheetsService {
  private sheetsService: sheets_v4.Sheets;

  constructor() {
    const credentials = JSON.parse(
      fs.readFileSync('config/forward-map-444713-t3-0d8a58b6b849.json', 'utf-8'),
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheetsService = google.sheets({ version: 'v4', auth });
  }

  // Read data from Google Sheets
  async readSheet(spreadsheetId: string, range: string) {
    try {
      const response = await this.sheetsService.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      if (response.data.values) {
        console.log('Read data from Google Sheets:', response.data.values);
        return response.data.values;
      } else {
        console.log('No data found in the given range.');
        return [];
      }
    } catch (error) {
      console.error('Error reading sheet:', error.message);
      throw new Error('Failed to read data from Google Sheets');
    }
  }
  
  // Append data to Google Sheets at the end
  async appendToSheet(spreadsheetId: string, values: any[][]) {
    // Use a general range to append data to the next available row (for example, column A)
    const range = 'Sheet1!A:A';

    try {
      const response = await this.sheetsService.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED', 
        insertDataOption: 'INSERT_ROWS',  
        requestBody: {
          values,
        },
      });
      console.log('Data appended successfully');
      return response.data;
    } catch (error) {
      console.error('Error appending data to sheet:', error.message);
      throw new Error('Failed to append data to Google Sheets');
    }
  }

  // Write data to Google Sheets
  async updateSheetData(spreadsheetId: string, range: string, values: any[]) {
    const response = await this.sheetsService.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    return response.data;
  }

}

// Here is config file's code 
// {
//     "type": "service_account",
//     "project_id": "forward-map-444713-t3",
//     "private_key_id": "0d8a58b6b849d9c700296d9db2e9bce46d9fe361",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCa924pSzGl4wIa\nlOogAvMoN8AeEhltjXzl18n/u5aPOuuY4uYeG4tKxamKoOTuAY4Ecld0AObleq2V\n/v7Lhv0g+kyDq2Bfs9kkCK+LuxrZ1ZKXrANPPQTFOW/lWKU7MUzLBiw44hoTLVwt\n3rerxXE8gMX3v8COskjqa6aYk/wT/Ku+ocxAA078BO761/TKJ+cmK0+df8XiNH1k\nzFr+MCvEkG38Txtj5gXsQo+vgaH+ywF2uqkWPj37UrL26aDuJBonDieUCGRo8lL+\nAXQmFompr5FdccaCP99RJxnSQLqhn3ppWMsfG89JvGR6ZkyfiDHnqgwbrrkAjnAq\nhWpgDz41AgMBAAECggEAA1PMZpA/Qie+0VGg5KFmQCxQ8ImvSGtmeExAVusxCeVC\nzsG8ctQLkxuYZCodOuux9XAmZuQSu8WnuYCZTvHDOJ83NQfhJgeSDNSE6b6m48Yo\nA3Va4tYqu+NbqYnUORJPavfjINuLTMhyDL1rUIGzneVz8A8KyZA+wY3LLMaB/e8r\n3m2FESqs5Vb99isvdGRDQN6hnNL/wynnL7eE58LjeUeo44sA92YLT+ht2XnWnKnN\n4c+D3fOf+ZuvgPOZtJ1DJR35XiBkZTdZl+PjV9CXs4zCLc0UqPyQ00fcFJFz3bZZ\n26/fmaSoZzkTf3wQtTD23TY1ztOr8Kt4ZugtCiSrwQKBgQDRfEr3wBlTWxCxWmyg\naeoyptlo93D1ti0Tb7Bbg6AqTV1e6ScSyDVybAjY7jiFz0J5Fei83WUkd0tcjOSv\nhDNei7SHPdY9a2gI+Q/tvECcybg5DL7hcHSe+Pg4TdOof85d/rCwNreKl/iWdCPP\n7c8nB4/dAc6z2thofaXZynr7VQKBgQC9YCJ3eKdLtCMnMLCmtrUNZ5l99Vty58bT\nwX75RcfnuQhGjj+uqeDHTD3htPDrs79/FD94bqtUDa/fG0G9AqxIE1a/o9S6uYvW\n/5xAF61xn9/8jZjD4tioOMRrP4+mEYZ6b1/62wDl5wMiq2gUlgIqpmsTp2MEz/MF\n0VXTiRv3YQKBgQDAIPn07heMLspJjwBvw5RLbmGZ9s+AW9xNpjMeS8N66MfJA5eV\nj1ANqG4Y36uxddymh2SUy402+75/nK0lGN+wR/uDykASxs585EkqpmywIAY5NKpg\nwy4Cm5+0rBSCxu0zoiLVCuodT7Jr8wrhal+CkVntvfmhVQcEFrEk5aMTnQKBgC8W\nwHtEnRTN7g/Io6RQuiRjJl+TqvGfgGkXLCN/nn2YHN6ucFdWFnZ4FssQ2vdA8tT+\ni+m+WwvDe3/WnzoIeB5T8LYmXrcve/4yAQBO4unl/yQlcV8EASuTMgQZAfchVHcN\nSqht3INONhFg3biAtHk2eFmivZRswNkpfFXlOfcBAoGBAJaxAulG0ug6N8+jXO6H\n6+JX12AxjUWm7kEtRb4E679iiEEkk+KnA/CU4ED5Pb9JUQIv5QEw/grDG9sQsyxa\n6AMonS0XXLP0JlZlJ2srY2Me0dfNVc6KJvlxUdz5YqGRoxYLfQaO3oRMQx+er5LU\n0jHakN8XnylcqtK3g0A/RWfP\n-----END PRIVATE KEY-----\n",
//     "client_email": "google-sheet-data@forward-map-444713-t3.iam.gserviceaccount.com",
//     "client_id": "108749721059404818748",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-sheet-data%40forward-map-444713-t3.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// }
