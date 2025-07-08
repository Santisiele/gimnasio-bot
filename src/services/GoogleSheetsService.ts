import { google } from "googleapis";
import * as dotenv from "dotenv";
import { JWT } from "google-auth-library";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let sheets: ReturnType<typeof google.sheets> | null = null;

function initSheetsClient() {
  if (sheets) return sheets;

  const credencialCruda = process.env.SHEET_CREDENCIALES;
  if (!credencialCruda) throw new Error("Falta SHEET_CREDENCIALES");

  const credentials = JSON.parse(credencialCruda);

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export const getSheetData = async (spreadsheetId: string, range: string) => {
  const sheetsClient = initSheetsClient();

  try {
    const response = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    return [];
  }
};
