import { Telegraf } from "telegraf";
import { buscarRutinaPorAlumno } from "@/services/AlumnoService";
import { parsearNombreBuscado } from "@/utils/parsearNombreBuscado";
import { parsearRutina } from "@/utils/parsearRutina";

export function comandoBuscarRutina(bot: Telegraf) {
  bot.command("rutina", async (ctx) => {
    let nombreBuscado = parsearNombreBuscado(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const resultado = await buscarRutinaPorAlumno(nombreBuscado);

    if (!resultado.ok) return ctx.reply(`❌ Error: ${resultado.error}`, { parse_mode: "Markdown" });

    const respuesta = parsearRutina(resultado.data);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
