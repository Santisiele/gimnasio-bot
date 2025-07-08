import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { comandoBuscarCompleto } from "@/commands/buscarCompleto";
import { comandoCargarCompleto } from "@/commands/cargarCompleto";
import { comandoBuscarRutina } from "@/commands/buscarRutina";
import { comandoBuscarDia } from "@/commands/buscarDia";
import { comandoImportarDesdeSheet } from "@/commands/importar";
import { comandoBorrar } from "@/commands/borrar";
import { comandoActualizar } from "@/commands/actualizar";
import { comandoAyuda } from "@/commands/ayuda";
import { comandoUsos } from "@/commands/usos";

dotenv.config();

const BOT_TOKEN = process.env.TOKEN_BOT || "No esta aca";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("¡Hola! Escribí /ayuda para ver los comandos disponibles.");
});

comandoBuscarCompleto(bot);
comandoCargarCompleto(bot);
comandoBuscarRutina(bot);
comandoBuscarDia(bot);
comandoImportarDesdeSheet(bot);
comandoBorrar(bot);
comandoActualizar(bot);
comandoAyuda(bot);
comandoUsos(bot);

export async function iniciarBot() {
  console.log("Bot corriendo...");
  await bot.launch();
}
