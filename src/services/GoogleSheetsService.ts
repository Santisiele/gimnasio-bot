import { google } from "googleapis";
import { JWT } from "google-auth-library";
import * as dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const rawCredentials = process.env.SHEET_CREDENCIALES || "No";

if (rawCredentials === "No") throw new Error("SHEET_CREDENCIALES no está definida en el entorno");

const credentials = JSON.parse(rawCredentials);

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export const getSheetData = async (spreadsheetId: string, range: string) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error leyendo Google Sheet:", error);
    return [];
  }
};
