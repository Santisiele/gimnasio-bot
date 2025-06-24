import { Telegraf } from "telegraf";
import { comandoBuscar } from "./commands/buscar";

const BOT_TOKEN = process.env.TOKEN_BOT || "Token no encontrado";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("¡Hola! Escribí /buscar seguido del nombre del alumno para ver su rutina.");
});

comandoBuscar(bot);

export async function iniciarBot() {
  console.log("Bot corriendo...");
  await bot.launch();
}
