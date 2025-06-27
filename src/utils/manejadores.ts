import { Context } from "telegraf";
import { Resultado } from "@/utils/types";

export async function manejarResultado<T>(// para las lecturas
    ctx: Context,
    resultado: Resultado<T>,
    opciones?: { mensajeError?: string }
): Promise<T | null> {
    if (!resultado.ok) {
        const prefijo = opciones?.mensajeError
            ? `❌ ${opciones.mensajeError}`
            : "❌ Ocurrió un error:";

        await ctx.reply(`${prefijo}\n${resultado.error}`, {
            parse_mode: "Markdown"
        });

        return null;
    }

    return resultado.data;
}

export async function manejarResultadoSimple(// para las cargas
  ctx: Context,
  resultado: Resultado<void>,
  mensajeError?: string
): Promise<boolean> {
  if (!resultado.ok) {
    await ctx.reply(`❌ ${mensajeError ?? "Ocurrió un error"}\n${resultado.error}`, {
      parse_mode: "Markdown",
    });
    return false;
  }
  return true;
}
