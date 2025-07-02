import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as credentials from '@/../serviceGoogleKey.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });


export const getSheetData = async (spreadsheetId: string, range: string) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error('Error leyendo Google Sheet:', error);
    return [];
  }
};
