import { google } from "googleapis";
import * as dotenv from "dotenv";
import { JWT } from "google-auth-library";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export const getSheetData = async (spreadsheetId: string, range: string) => {
  const rawCredentials = process.env.SHEET_CREDENCIALES;
  if (!rawCredentials) throw new Error("Falta SHEET_CREDENCIALES");

  const credentials = JSON.parse(rawCredentials);

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error("Error al acceder a Google Sheets:", error);
    return [];
  }
};
