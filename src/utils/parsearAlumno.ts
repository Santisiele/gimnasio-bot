import { Alumno } from "@/models/Alumno";
import { parsearRutina } from "@/utils/parsearRutina";

export function parsearAlumno(alumno: Alumno): string {
  let respuesta = `📋 *Info de ${alumno.nombre ?? "Alumno sin nombre"}*\n\n`;

  respuesta += parsearRutina(alumno.rutinas, alumno.comentarios, alumno.atencion) + "\n";

  respuesta+= "\n";
  respuesta += `💡 *Sugerencia:* ${alumno.sugerencia ? "Sí" : "No"}\n`;
  respuesta += `📈 *Nuevo Nivel:* ${alumno.nuevoNivel}\n`;
  respuesta += `🔄 *Motivo de Cambio:* ${alumno.motivoCambio}\n`;
  respuesta += `👤 *Modificado por:* ${alumno.ultimaModificacionPor}\n`;
  respuesta += `🏋️ *Profe Encargado:* ${alumno.profeEncargado}`;

  return respuesta.trim();
}
