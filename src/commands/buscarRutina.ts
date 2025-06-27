import { Telegraf } from "telegraf";
import { buscarRutinaPorAlumno } from "@/services/AlumnoService";
import { parsearNombreBuscado } from "@/utils/parsearNombreBuscado";
import { parsearRutina } from "@/utils/parsearRutina";

export function comandoBuscarRutina(bot: Telegraf) {
  bot.command("rutina", async (ctx) => {
    let nombreBuscado = parsearNombreBuscado(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const rutina = await buscarRutinaPorAlumno(nombreBuscado);

    if (!rutina) return ctx.reply(`No encontré a "${nombreBuscado}" en la base.`);

    const respuesta = parsearRutina(rutina);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
