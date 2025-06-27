import { Telegraf } from "telegraf";
import { buscarAlumnoCompleto } from "@/services/AlumnoService";
import { parsearNombre } from "@/utils/parsearNombre";
import { parsearAlumno } from "@/utils/parsearAlumno";
import { manejarResultado } from "@/utils/manejadores";

export function comandoBuscarCompleto(bot: Telegraf) {
  bot.command("buscar", async (ctx) => {
    const nombreBuscado = parsearNombre(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const resultado = await buscarAlumnoCompleto(nombreBuscado);
    const alumno = await manejarResultado(ctx, resultado, {
      mensajeError: `No se pudo obtener al alumno *${nombreBuscado}*`,
    });
    
    if (!alumno) return;

    const respuesta = parsearAlumno(alumno);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
