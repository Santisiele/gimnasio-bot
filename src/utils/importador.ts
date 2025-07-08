import { getSheetData } from "@/services/GoogleSheetsService";
import * as dotenv from "dotenv";

(async () => {
  const spreadsheetId = process.env.SPREADSHEET_ID!;
  let filaIndex = 2;
  const bloqueSize = 20;
  let importados = 0;

  while (true) {
    const fin = filaIndex + bloqueSize - 1;
    const range = `Alumnos!A${filaIndex}:I${fin}`;
    const rows = await getSheetData(spreadsheetId, range);

    if (!rows.length) break;

    for (const row of rows) {
      const nombre = row[0]?.toString().trim();
      if (!nombre) process.exit(0);


      process.send?.({
        type: "fila",
        payload: {
          nombre,
          atencion: row[1],
          sugerencia: row[2],
          nuevoNivel: row[3],
          motivoCambio: row[4],
          ultimaModPor: row[5],
          profeEncargado: row[6],
          comentarios: row[7],
          rutina: row[8],
        },
      });

      importados++;
    }

    filaIndex += bloqueSize;
  }

  process.exit(0);
})();
