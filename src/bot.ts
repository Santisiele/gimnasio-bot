import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { comandoBuscarCompleto } from "./commands/buscarCompleto";
import { comandoCargarCompleto } from "./commands/cargarCompleto";
import { comandoBuscarRutina } from "./commands/buscarRutina";
import { comandoBuscarDia } from "./commands/buscarDia";

dotenv.config();

const BOT_TOKEN = process.env.TOKEN_BOT || "No esta aca";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("¡Hola! Escribí /buscar seguido del nombre del alumno para ver su rutina.");
});

comandoBuscarCompleto(bot);
comandoCargarCompleto(bot);
comandoBuscarRutina(bot);
comandoBuscarDia(bot);

export async function iniciarBot() {
  console.log("Bot corriendo...");
  await bot.launch();
}
