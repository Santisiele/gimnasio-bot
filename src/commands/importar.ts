import { fork } from "child_process";
import path from "path";
import { Telegraf } from "telegraf";
import { MensajeImportador } from "@/utils/types";

export function comandoImportarDesdeSheet(bot: Telegraf) {
  bot.command("importar", async (ctx) => {
    await ctx.reply("🚀 Iniciando importación...");

    const child = fork(path.resolve(__dirname, "../utils/importador.ts"));

    let total = 0;
    let finalizado = false;
    let yaRespondido = false;
    let pendientes = 0;

    const responderSiFinalizo = async () => {
      if (finalizado && pendientes === 0 && !yaRespondido) {
        yaRespondido = true;
        await ctx.reply(`✅ Importación finalizada. Se procesaron ${total} alumnos.`);
      }
    };

    child.on("message", async (msg: MensajeImportador) => {
      if (msg.type !== "fila") return;

      total++;
      pendientes++;

      const {
        nombre,
        atencion,
        sugerencia,
        nuevoNivel,
        motivoCambio,
        ultimaModPor,
        profeEncargado,
        comentarios,
        rutina,
      } = msg.payload;

      const rutinaFormateada = rutina
        .split("\n")
        .map((linea) => linea.trim())
        .filter(Boolean);

      const texto = [
        "/cargar",
        `Nombre: ${nombre}`,
        `Atencion: ${atencion}`,
        `Sugerencia: ${sugerencia.toLowerCase() === "si"}`,
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

      try {
        await bot.handleUpdate({
          update_id: Date.now(),
          message: fakeMessage,
        } as any);
      } finally {
        pendientes--;
        await responderSiFinalizo();
      }
    });

    child.on("exit", async () => {
      finalizado = true;
      await responderSiFinalizo();
    });
  });
}
