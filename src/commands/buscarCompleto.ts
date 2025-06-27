import { Telegraf } from "telegraf";
import { buscarAlumnoCompleto } from "@/services/AlumnoService";
import { parsearNombreBuscado } from "@/utils/parsearNombreBuscado";
import { parsearAlumno } from "@/utils/parsearAlumno";

export function comandoBuscarCompleto(bot: Telegraf) {
  bot.command("buscar", async (ctx) => {
    let nombreBuscado = parsearNombreBuscado(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const resultado = await buscarAlumnoCompleto(nombreBuscado);

    if (!resultado.ok) return ctx.reply(`❌ Error: ${resultado.error}`, { parse_mode: "Markdown" });

    const respuesta = parsearAlumno(resultado.data);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
