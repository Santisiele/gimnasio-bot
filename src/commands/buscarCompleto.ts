import { Telegraf } from "telegraf";
import { buscarAlumnoCompleto } from "@/services/AlumnoService";
import { parsearNombreBuscado } from "@/utils/parsearNombreBuscado";
import { parsearAlumno } from "@/utils/parsearAlumno";

export function comandoBuscarCompleto(bot: Telegraf) {
  bot.command("buscar", async (ctx) => {
    let nombreBuscado = parsearNombreBuscado(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const alumno = await buscarAlumnoCompleto(nombreBuscado);

    if (!alumno) return ctx.reply(`No encontré a "${nombreBuscado}" en la base.`);

    const respuesta = parsearAlumno(alumno);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
