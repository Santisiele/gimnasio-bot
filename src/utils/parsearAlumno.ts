import { Alumno } from "@/models/Alumno";
import { parsearRutina } from "@/utils/parsearRutina";

export function parsearAlumno(alumno: Alumno): string {
  let respuesta = `📋 *Rutina de ${alumno.nombre ?? "Alumno sin nombre"}*\n`;

  if (alumno.comentarios) respuesta += `📝 *Comentarios:* ${alumno.comentarios}\n\n`;

  respuesta += parsearRutina(alumno.rutinas) + "\n";

  respuesta+= "\n";
  respuesta += `🧠 *Atención:* ${alumno.atencion}/5\n`;
  respuesta += `💡 *Sugerencia:* ${alumno.sugerencia ? "Sí" : "No"}\n`;
  respuesta += `📈 *Nuevo Nivel:* ${alumno.nuevoNivel}\n`;
  respuesta += `🔄 *Motivo de Cambio:* ${alumno.motivoCambio}\n`;
  respuesta += `👤 *Modificado por:* ${alumno.ultimaModificacionPor}\n`;
  respuesta += `🏋️ *Profe Encargado:* ${alumno.profeEncargado}`;

  return respuesta.trim();
}
