import { Telegraf } from "telegraf";
import { buscarAlumno } from "./services/AlumnoService";
import * as dotenv from "dotenv";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "NO HAY TOKEN";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("¡Hola! Escribí /buscar seguido del nombre del alumno para ver su rutina.");
});

bot.command("buscar", async (ctx) => {
  const texto = ctx.message.text;
  const partes = texto.split(" ");
  partes.shift();
  const nombreBuscado = partes.join(" ");

  if (!nombreBuscado) {
    return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");
  }

  const alumno = await buscarAlumno(nombreBuscado);

  if (!alumno) {
    return ctx.reply(`No encontré a "${nombreBuscado}" en la base.`);
  }

  let respuesta = `Rutina de ${alumno.nombre}\n`;

  if (alumno.comentarios) {
    respuesta += `Comentarios: ${alumno.comentarios}\n\n`;
  }

  for (const rutina of alumno.rutinas) {
    respuesta += `📅 ${rutina.dia}:\n`;
    for (const ej of rutina.ejercicios) {
      respuesta += ` - ${ej.nombre}`;
      if (ej.series) respuesta += ` ${ej.series}`;
      if (ej.peso) respuesta += ` (${ej.peso})`;
      if (ej.tiempo) respuesta += ` - ${ej.tiempo}`;
      respuesta += `\n`;
    }
    respuesta += `\n`;
  }

  ctx.reply(respuesta);
});

bot.launch();
console.log("Bot corriendo...");
