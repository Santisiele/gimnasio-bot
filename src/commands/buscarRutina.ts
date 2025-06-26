import { Telegraf } from "telegraf";
import { buscarRutinaPorAlumno } from "../services/AlumnoService";
import { formatearRutina } from "../utils/formatearRutina";

export function comandoBuscarRutina(bot: Telegraf) {
  bot.command("rutina", async (ctx) => {
    const texto = ctx.message.text;
    const partes = texto.split(" ");
    partes.shift();
    const nombreBuscado = partes.join(" ");

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const rutina = await buscarRutinaPorAlumno(nombreBuscado);

    if (!rutina) return ctx.reply(`No encontré a "${nombreBuscado}" en la base.`);

    const respuesta = formatearRutina(rutina);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
