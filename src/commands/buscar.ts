import { Telegraf } from "telegraf";
import { buscarAlumno } from "../services/AlumnoService";
import { formatearAlumno } from "../utils/formatearAlumno";

export function comandoBuscar(bot: Telegraf) {
  bot.command("buscar", async (ctx) => {
    const texto = ctx.message.text;
    const partes = texto.split(" ");
    partes.shift();
    const nombreBuscado = partes.join(" ");

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const alumno = await buscarAlumno(nombreBuscado);

    if (!alumno) return ctx.reply(`No encontré a "${nombreBuscado}" en la base.`);

    const respuesta = formatearAlumno(alumno);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
