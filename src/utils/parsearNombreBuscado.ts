import { Context } from "telegraf";

function capitalizarPalabras(texto: string): string {
  return texto
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

export function parsearNombreBuscado(ctx: Context, overrideParts?: string[]): string {
  const partes = overrideParts ?? (
    (ctx.message && "text" in ctx.message)
      ? (ctx.message.text as string).split(" ").slice(1)
      : []
  );
  return capitalizarPalabras(partes.join(" "));
}
