import { Telegraf } from "telegraf";
import { guardarAlumno } from "../services/AlumnoService";
import { Alumno, Rutina } from "../models/Alumno";

export function comandoCargar(bot: Telegraf) {
    bot.command("cargar", async (ctx) => {
        const texto = ctx.message.text.replace("/cargar", "").trim();
        if (!texto) return ctx.reply("Pegá los datos del alumno después de `/cargar`, separados por líneas.");

        const lineas = texto.split("\n").map(l => l.trim()).filter(Boolean);
        const campos: any = {};
        const rutinasTexto: string[] = [];
        let parsingRutinas = false;

        for (const linea of lineas) {
            if (/^Rutinas:$/i.test(linea)) {
                parsingRutinas = true;
                continue;
            }

            if (parsingRutinas) rutinasTexto.push(linea);
            else {
                const [clave, ...resto] = linea.split(":");
                if (!clave || resto.length === 0) continue;
                campos[clave.toLowerCase().trim()] = resto.join(":").trim();
            }
        }

        if (!campos["nombre"]) return ctx.reply("Falta el campo obligatorio: Nombre");


        const alumno: Alumno = {
            nombre: campos["nombre"],
            comentarios: campos["comentarios"],
            atencion: campos["atencion"] ? parseInt(campos["atencion"]) : undefined,
            sugerencia: campos["sugerencia"] === "true",
            nuevoNivel: campos["nuevo nivel"],
            motivoCambio: campos["motivo cambio"],
            ultimaModificacionPor: campos["ultima modificacion por"],
            profeEncargado: campos["profe encargado"],
            rutinas: parsearRutinas(rutinasTexto)
        };

        await guardarAlumno(alumno);
        ctx.reply(`✅ Alumno *${alumno.nombre}* cargado correctamente.`, { parse_mode: "Markdown" });
    });
}

function parsearRutinas(rutinasTexto: string[]): Rutina[] {
    const rutinas: Rutina[] = [];
    let rutinaActual: Rutina | null = null;

    for (const linea of rutinasTexto) {
        if (/^día\s+\d+/i.test(linea)) {
            if (rutinaActual) rutinas.push(rutinaActual);
            rutinaActual = { dia: linea, ejercicios: [] };
        } else if (rutinaActual) rutinaActual.ejercicios.push(linea);
    }

    if (rutinaActual) rutinas.push(rutinaActual);
    return rutinas;
}