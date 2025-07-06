import { Telegraf } from "telegraf";

export function comandoAyuda(bot: Telegraf) {
    bot.command("ayuda", async (ctx) => {
        const respuesta = `Comandos disponibles:
/importar - Cargar la planilla de Google Sheets.
/borrar - Borrar un alumno.
/rutina - Obtener rutina, comentarios y nivel de atención.
/buscarDia - Traer la rutina de un día específico.
/buscar - Obtener la información completa de un alumno.
/cargar - Cargar un alumno. Si ya existe, se sobrescribe toda la información.
/actualizar - Actualizar los datos de un alumno. Los campos no especificados se conservan.
/usos - Mostrar cómo usar cada comando.`;

        await ctx.reply(respuesta);
    });
}
