import { Telegraf } from "telegraf";
import { actualizarAlumnoParcial } from "@/services/AlumnoService";
import { manejarResultadoSimple } from "@/utils/manejadores";
import { parsearTextoAAlumno } from "@/utils/parseoAlumnoInverso";

export function comandoActualizar(bot: Telegraf) {
  bot.command("actualizar", async (ctx) => {
    const texto = ctx.message.text.replace("/actualizar", "").trim();
    if (!texto) return ctx.reply("Pegá los datos del alumno a actualizar después de `/actualizar`, separados por líneas.");

    let nombre: string;
    let alumno: any;
    let camposInvalidos: string[];

    try {
      const resultado = parsearTextoAAlumno(ctx, texto);
      nombre = resultado.nombre;
      alumno = resultado.alumno;
      camposInvalidos = resultado.camposInvalidos;
    } catch (e: any) {
      return ctx.reply(`❌ ${e.message}`);
    }

    if (!nombre) return ctx.reply("Falta el campo obligatorio: *Nombre*", { parse_mode: "Markdown" });

    if (Object.keys(alumno).length === 0) {
      return ctx.reply("No se encontraron campos válidos para actualizar.");
    }

    if (camposInvalidos.length > 0) {
      ctx.reply(`⚠️ Campos no reconocidos:\n${camposInvalidos.map(c => `- *${c}*`).join("\n")}`, {
        parse_mode: "Markdown"
      });
    }

    const ok = await manejarResultadoSimple(
      ctx,
      await actualizarAlumnoParcial(nombre, alumno),
      `No se pudo actualizar al alumno *${nombre}*`
    );

    if (ok) ctx.reply(`✅ Alumno *${nombre}* actualizado correctamente.`, { parse_mode: "Markdown" });
  });
}
