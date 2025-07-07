import { Telegraf } from "telegraf";

export function comandoUsos(bot: Telegraf) {
    bot.command("usos", async (ctx) => {
        const mensaje = `
📌 *Formato de uso de los comandos:*

✅ /cargar  
Pegá los datos del alumno en este formato, línea por línea:

Nombre: Juan Pérez  
Atencion: Alta  
Sugerencia: true  
Nuevo Nivel: Intermedio  
Motivo Cambio: Progreso  
Ultima Modificacion Por: Laura  
Profe Encargado: Marcos  
Comentarios: Muy responsable  
Rutinas:  
Día 1  
Sentadillas - 3x10  
...

✅ /actualizar  
Igual que /cargar, pero actualiza solo los campos que mandás.

✅ /borrar <nombre>  
Ej: /borrar Juan Pérez

✅ /buscar <nombre>  
Ej: /buscar Juan Pérez

✅ /rutina <nombre>  
Ej: /rutina Juan Pérez

✅ /buscarDia <nombre> <número_día>  
Ej: /buscarDia Juan Pérez 2

✅ /importar  
(No necesita argumentos. Importa todo desde Google Sheets)

Usá /ayuda para ver la lista de comandos, y /usos para ver estos ejemplos nuevamente.
  `;

        await ctx.reply(mensaje);
    });
}