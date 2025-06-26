import { Alumno } from "../models/Alumno";
import { formatearRutina } from "./formatearRutina";

export function formatearAlumno(alumno: Alumno): string {
  let respuesta = `📋 *Rutina de ${alumno.nombre ?? "Alumno sin nombre"}*\n`;

  if (alumno.comentarios) respuesta += `📝 *Comentarios:* ${alumno.comentarios}\n\n`;

  respuesta += formatearRutina(alumno.rutinas) + "\n";

  respuesta += `🧠 *Atención:* ${alumno.atencion}/10\n`;
  respuesta += `💡 *Sugerencia:* ${alumno.sugerencia ? "Sí" : "No"}\n`;
  respuesta += `📈 *Nuevo Nivel:* ${alumno.nuevoNivel}\n`;
  respuesta += `🔄 *Motivo de Cambio:* ${alumno.motivoCambio}\n`;
  respuesta += `👤 *Modificado por:* ${alumno.ultimaModificacionPor}\n`;
  respuesta += `🏋️ *Profe Encargado:* ${alumno.profeEncargado}`;

  return respuesta.trim();
}
