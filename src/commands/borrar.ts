import { Telegraf } from "telegraf";
import { borrarAlumno, buscarAlumnoCompleto } from "@/services/AlumnoService";
import { parsearNombre } from "@/utils/parsearNombre";
import { manejarResultado } from "@/utils/manejadores";

export function comandoBorrar(bot: Telegraf) {
  bot.command("borrar", async (ctx) => {
    const nombreBuscado = parsearNombre(ctx);

    if (!nombreBuscado) return ctx.reply("Por favor, escribí un nombre. Ej: /borrar Juan Pérez");

    const resultadoBuscar = await buscarAlumnoCompleto(nombreBuscado);
    const alumno = await manejarResultado(ctx, resultadoBuscar, {
      mensajeError: `No se encontró al alumno *${nombreBuscado}* para borrar`,
    });

    if (!alumno) return;

    const resultadoBorrar = await borrarAlumno(nombreBuscado);
    if (!resultadoBorrar.ok) {
      return ctx.reply(`⚠️ Ocurrió un error al borrar a *${nombreBuscado}*: ${resultadoBorrar.error}`, {
        parse_mode: "Markdown",
      });
    }

    ctx.reply(`✅ Alumno *${nombreBuscado}* borrado correctamente.`, { parse_mode: "Markdown" });
  });
}
