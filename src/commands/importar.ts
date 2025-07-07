import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";

dotenv.config();

export function comandoImportarDesdeSheet(bot: Telegraf) {
  bot.command("importar", async (ctx) => {
    await ctx.reply("📥 Importando datos desde Google Sheets...");

    const { getSheetData } = await import("@/services/GoogleSheetsService");
    const spreadsheetId = process.env.SPREADSHEET_ID!;
    const range = "Alumnos!A2:I";

    const todasLasFilas = await getSheetData(spreadsheetId, range);

    const filas: string[][] = [];
    for (const row of todasLasFilas) {
      const nombre = row[0]?.toString().trim();
      if (!nombre) break;
      filas.push(row);
    }

    let importados = 0;

    for (const row of filas) {
      const [nombre, atencion, sugerencia, nuevoNivel, motivoCambio, ultimaModPor, profeEncargado, comentarios, rutina] = row;

      const rutinaFormateada = (rutina as string)
        .split("\n")
        .map((linea) => linea.trim())
        .filter(Boolean);

      const texto = [
        "/cargar",
        `Nombre: ${nombre}`,
        `Atencion: ${atencion}`,
        `Sugerencia: ${String(sugerencia).toLowerCase() === "si"}`,
        `Nuevo Nivel: ${nuevoNivel}`,
        `Motivo Cambio: ${motivoCambio}`,
        `Ultima Modificacion Por: ${ultimaModPor}`,
        `Profe Encargado: ${profeEncargado}`,
        `Comentarios: ${comentarios || ""}`,
        `Rutinas:`,
        ...rutinaFormateada,
      ].join("\n");

      const fakeMessage = {
        message_id: Date.now(),
        from: ctx.from,
        chat: ctx.chat,
        date: Math.floor(Date.now() / 1000),
        text: texto,
        entities: [{ offset: 0, length: 7, type: "bot_command" }],
      };

      await bot.handleUpdate({
        update_id: Date.now(),
        message: fakeMessage,
      } as any);

      importados++;
    }

    await ctx.reply(`✅ Importación finalizada. Se procesaron ${importados} alumnos.`);
  });
}
