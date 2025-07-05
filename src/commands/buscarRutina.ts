import { Telegraf } from "telegraf";
import { buscarRutinaPorAlumno } from "@/services/AlumnoService";
import { parsearNombre } from "@/utils/parsearNombre";
import { parsearRutina } from "@/utils/parsearRutina";
import { manejarResultado } from "@/utils/manejadores";

export function comandoBuscarRutina(bot: Telegraf) {
  bot.command("rutina", async (ctx) => {
    const nombreBuscado = parsearNombre(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /buscar Juan Pérez");

    const resultado = await buscarRutinaPorAlumno(nombreBuscado);
    const datos = await manejarResultado(ctx, resultado, {
      mensajeError: `No se pudo obtener la rutina de *${nombreBuscado}*`,
    });

    if (!datos) return;

    let respuesta = `📋 *Rutina de ${nombreBuscado}*\n\n`;

    respuesta += parsearRutina(datos.rutinas, datos.comentarios, datos.atencion);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}
