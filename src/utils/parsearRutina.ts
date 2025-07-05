import { Rutina } from "@/models/Alumno";

export function parsearRutina(rutinas: Rutina[] | undefined, comentarios?: string, atencion?: string): string {
  if (!rutinas || rutinas.length === 0) return "_No hay rutinas cargadas._";

  let respuesta = `📝 *Comentarios:* ${comentarios ?? "Sin comentarios"}\n`;

  respuesta += `🧠 *Atención:* ${atencion}/5\n`;

  respuesta += "📋 *Rutina cargada:*\n\n";

  for (const rutina of rutinas) {
    respuesta += `📅 *${rutina.dia}*\n`;
    for (const ejercicio of rutina.ejercicios) {
      respuesta += `• ${ejercicio}\n`;
    }
    respuesta += `\n`;
  }

  return respuesta.trim();
}