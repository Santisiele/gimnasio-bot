import { Alumno, Rutina } from "@/models/Alumno";
import { parsearNombre } from "@/utils/parsearNombre";

const CLAVES_VALIDAS = [
  "nombre", "comentarios", "atencion", "sugerencia", "nuevo nivel",
  "motivo cambio", "ultima modificacion por", "profe encargado"
];

export function parsearTextoAAlumno(ctx: any, texto: string) {
  const lineas = texto.split("\n").map(l => l.trim()).filter(Boolean);
  const campos: Record<string, string> = {};
  const rutinasTexto: string[] = [];
  let parsingRutinas = false;

  for (const linea of lineas) {
    if (/^Rutinas:$/i.test(linea)) {
      parsingRutinas = true;
      continue;
    }

    if (parsingRutinas) {
      rutinasTexto.push(linea);
    } else {
      const [clave, ...resto] = linea.split(":");
      if (!clave || resto.length === 0) continue;

      const claveNormalizada = clave
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

      if (CLAVES_VALIDAS.includes(claveNormalizada)) {
        campos[claveNormalizada] = resto.join(":").trim();
      }
    }
  }

  const nombre = parsearNombre(ctx, [campos["nombre"] || ""]);

  const rutinas = convertirTextoARutinas(rutinasTexto);

  const alumnoParcial: Partial<Alumno> = {
    comentarios: campos["comentarios"],
    atencion: campos["atencion"],
    sugerencia: campos["sugerencia"]?.toLowerCase() === "true",
    nuevoNivel: campos["nuevo nivel"],
    motivoCambio: campos["motivo cambio"],
    ultimaModificacionPor: campos["ultima modificacion por"],
    profeEncargado: campos["profe encargado"],
    ...(rutinas.length > 0 ? { rutinas } : {}),
  };

  return {
    nombre,
    alumno: alumnoParcial,
    camposInvalidos: Object.keys(campos).filter(k => !CLAVES_VALIDAS.includes(k)),
    rutinasIncluidas: rutinas.length > 0,
  };
}

function convertirTextoARutinas(rutinasTexto: string[]): Rutina[] {
  const rutinas: Rutina[] = [];
  let rutinaActual: Rutina | null = null;

  for (const linea of rutinasTexto) {
    const lineaNormalizada = linea
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (/^dia\s+.+/.test(lineaNormalizada)) {
      if (rutinaActual) rutinas.push(rutinaActual);

      const numero = linea.match(/\d+/)?.[0] || "1";
      rutinaActual = { dia: `Dia ${numero}`, ejercicios: [] };
    } else if (rutinaActual) {
      rutinaActual.ejercicios.push(linea);
    }
  }

  if (rutinaActual) rutinas.push(rutinaActual);
  return rutinas;
}
