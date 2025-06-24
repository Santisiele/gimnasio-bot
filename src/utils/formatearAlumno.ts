import { Alumno } from "../models/Alumno";

export function formatearAlumno(alumno: Alumno): string {
    let respuesta = `📋 *Rutina de ${alumno.nombre ?? "Alumno sin nombre"}*\n`;

    if (alumno.comentarios) respuesta += `📝 *Comentarios:* ${alumno.comentarios}\n\n`;

    if (!alumno.rutinas || alumno.rutinas.length === 0) respuesta += "_No hay rutinas cargadas._\n\n";
    else {
        for (const rutina of alumno.rutinas) {
            respuesta += `📅 *${rutina.dia}*\n`;
            for (const ejercicio of rutina.ejercicios)
                respuesta += `• ${ejercicio}\n`;
            respuesta += `\n`;
        }
    }

    respuesta += `🧠 *Atención:* ${alumno.atencion}/10\n`;
    respuesta += `💡 *Sugerencia:* ${alumno.sugerencia ? "Sí" : "No"}\n`;
    respuesta += `📈 *Nuevo Nivel:* ${alumno.nuevoNivel}\n`;
    respuesta += `🔄 *Motivo de Cambio:* ${alumno.motivoCambio}\n`;
    respuesta += `👤 *Modificado por:* ${alumno.ultimaModificacionPor}\n`;
    respuesta += `🏋️ *Profe Encargado:* ${alumno.profeEncargado}`;

    return respuesta;
}
