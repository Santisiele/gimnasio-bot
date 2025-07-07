import { Telegraf } from "telegraf";
import { buscarDiaPorAlumno } from "@/services/AlumnoService";
import { parsearNombre } from "@/utils/parsearNombre";
import { parsearRutina } from "@/utils/parsearRutina";
import { manejarResultado } from "@/utils/manejadores";

export function comandoBuscarDia(bot: Telegraf) {
  bot.command("buscarDia", async (ctx) => {
    const texto = (ctx.message && "text" in ctx.message) ? ctx.message.text : "";
    const partes = texto.split(" ");
    partes.shift();

    if (partes.length < 2) return ctx.reply("Por favor, escribí un nombre y un número de día. Ej: /buscarDia Juan Pérez 2");

    const numeroDia = parseInt(partes[partes.length - 1], 10);
    if (isNaN(numeroDia)) return ctx.reply("El último valor debe ser un número. Ej: /buscarDia Juan Pérez 2");

    const nombreBuscado = parsearNombre(ctx, partes.slice(0, -1));
    const diaTexto = `Dia ${numeroDia}`;

    const resultado = await buscarDiaPorAlumno(nombreBuscado, diaTexto);
    const rutina = await manejarResultado(ctx, resultado, {
      mensajeError: `No se pudo obtener la rutina del *${diaTexto}* para *${nombreBuscado}*`,
    });
    
    if (!rutina) return;

    const respuesta = parsearRutina([rutina]);
    ctx.reply(respuesta, { parse_mode: "Markdown" });
  });
}