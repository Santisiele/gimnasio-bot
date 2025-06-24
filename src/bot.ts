import { Telegraf } from "telegraf";
import { comandoBuscar } from "./commands/buscar";
import { comandoCargar } from "./commands/cargar";

const BOT_TOKEN = process.env.TOKEN_BOT || "No esta aca";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("¡Hola! Escribí /buscar seguido del nombre del alumno para ver su rutina.");
});

comandoBuscar(bot);
comandoCargar(bot);

export async function iniciarBot() {
  console.log("Bot corriendo...");
  await bot.launch();
}
