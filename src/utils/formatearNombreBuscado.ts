import { Context } from "telegraf";

function capitalizarPalabras(texto: string): string {
    return texto
        .split(" ")
        .map(palabra =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        )
        .join(" ");
}

export function formatearNombreBuscado(ctx: Context): string {
    const texto = (ctx.message && "text" in ctx.message)
        ? (ctx.message.text as string)
        : "";
    const partes = texto.split(" ");
    partes.shift();
    const nombre = partes.join(" ");
    return capitalizarPalabras(nombre);
}
