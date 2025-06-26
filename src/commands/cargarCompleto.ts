import { Telegraf } from "telegraf";
import { guardarAlumnoCompleto } from "@/services/AlumnoService";
import { Alumno, Rutina } from "@/models/Alumno";

export function comandoCargarCompleto(bot: Telegraf) {
    bot.command("cargar", async (ctx) => {
        const texto = ctx.message.text.replace("/cargar", "").trim();
        if (!texto) return ctx.reply("Pegá los datos del alumno después de `/cargar`, separados por líneas.");

        const lineas = texto.split("\n").map(l => l.trim()).filter(Boolean);
        const campos: Record<string, string> = {};
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

                const claveNormalizada = clave
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
                    .trim();

                campos[claveNormalizada] = resto.join(":").trim();
            }
        }

        if (!campos["nombre"]) return ctx.reply("Falta el campo obligatorio: *Nombre*", { parse_mode: "Markdown" });

        // Validar si hay campos mal escritos
        const clavesValidas = [
            "nombre", "comentarios", "atencion", "sugerencia", "nuevo nivel",
            "motivo cambio", "ultima modificacion por", "profe encargado"
        ];

        const camposInvalidos = Object.keys(campos).filter(k => !clavesValidas.includes(k));

        for (const invalido of camposInvalidos) ctx.reply(`⚠️ Campo no reconocido: *${invalido}*`, { parse_mode: "Markdown" });

        const rutinas = parsearRutinas(rutinasTexto);
        if (rutinas.length === 0) return ctx.reply("Debe haber al menos una rutina con ejercicios.");

        const alumno: Alumno = {
            nombre: campos["nombre"],
            comentarios: campos["comentarios"] || "",
            atencion: campos["atencion"] || "",
            sugerencia: campos["sugerencia"]?.toLowerCase() === "true",
            nuevoNivel: campos["nuevo nivel"] || "",
            motivoCambio: campos["motivo cambio"] || "",
            ultimaModificacionPor: campos["ultima modificacion por"] || "",
            profeEncargado: campos["profe encargado"] || "",
            rutinas
        };

        await guardarAlumnoCompleto(alumno);
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
