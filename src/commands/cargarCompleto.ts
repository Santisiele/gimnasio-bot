import { Telegraf } from "telegraf";
import { Alumno } from "@/models/Alumno";
import { manejarResultadoSimple } from "@/utils/manejadores";
import { cargarAlumnoCompleto } from "@/services/AlumnoService";
import { parsearTextoAAlumno } from "@/utils/parseoAlumnoInverso";

export function comandoCargarCompleto(bot: Telegraf) {
  bot.command("cargar", async (ctx) => {
    const texto = ctx.message.text.replace("/cargar", "").trim();
    if (!texto) {
      return ctx.reply("Pegá los datos del alumno después de `/cargar`, separados por líneas.");
    }

    let nombre: string;
    let alumnoParcial: Partial<Alumno>;
    let camposInvalidos: string[];
    let rutinasIncluidas: boolean;

    try {
      const resultado = parsearTextoAAlumno(ctx, texto);
      nombre = resultado.nombre;
      alumnoParcial = resultado.alumno;
      camposInvalidos = resultado.camposInvalidos;
      rutinasIncluidas = resultado.rutinasIncluidas;
    } catch (error: any) {
      return ctx.reply(`❌ Error al procesar los datos: ${error.message}`);
    }

    if (!nombre) return ctx.reply("Falta el campo obligatorio: *Nombre*", { parse_mode: "Markdown" });

    if (!rutinasIncluidas) return ctx.reply("Debe haber al menos una rutina con ejercicios.");

    if (camposInvalidos.length > 0) {
      await ctx.reply(
        `⚠️ Campos no reconocidos:\n${camposInvalidos.map(c => `- *${c}*`).join("\n")}`,
        { parse_mode: "Markdown" }
      );
    }

    const alumno: Alumno = {
      nombre,
      comentarios: alumnoParcial.comentarios || "",
      atencion: alumnoParcial.atencion || "",
      sugerencia: alumnoParcial.sugerencia ?? false,
      nuevoNivel: alumnoParcial.nuevoNivel || "",
      motivoCambio: alumnoParcial.motivoCambio || "",
      ultimaModificacionPor: alumnoParcial.ultimaModificacionPor || "",
      profeEncargado: alumnoParcial.profeEncargado || "",
      rutinas: alumnoParcial.rutinas!,
    };

    const ok = await manejarResultadoSimple(
      ctx,
      await cargarAlumnoCompleto(alumno),
      `No se pudo guardar al alumno *${alumno.nombre}*`
    );

    if (ok) ctx.reply(`✅ Alumno *${alumno.nombre}* cargado correctamente.`, { parse_mode: "Markdown" });
  });
}
