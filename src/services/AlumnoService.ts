import { db } from "@/firebase";
import { Alumno, Rutina } from "@/models/Alumno";
import { Resultado } from "@/utils/types";
import { RutinaConComentariosAtencion } from "@/utils/types";

const COLECCION = "alumnos";

export async function cargarAlumnoCompleto(alumno: Alumno): Promise<Resultado<void>> {
  try {
    await db.collection(COLECCION).doc(alumno.nombre).set(alumno);
    return { ok: true, data: undefined };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al guardar el alumno" };
  }
}

export async function actualizarAlumnoParcial(
  nombre: string,
  datos: Partial<Alumno>
): Promise<Resultado<void>> {
  try {
    const ref = db.collection(COLECCION).doc(nombre);
    const doc = await ref.get();

    if (!doc.exists) return { ok: false, error: `El alumno "${nombre}" no existe` };

    const datosFiltrados = Object.entries(datos).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key as keyof Alumno] = value as any;
      }
      return acc;
    }, {} as Partial<Alumno>);

    await ref.set(datosFiltrados, { merge: true });

    return { ok: true, data: undefined };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al actualizar el alumno" };
  }
}


export async function buscarAlumnoCompleto(nombre: string): Promise<Resultado<Alumno>> {
  try {
    const doc = await db.collection(COLECCION).doc(nombre).get();
    if (!doc.exists) return { ok: false, error: "El alumno no existe" };

    return { ok: true, data: doc.data() as Alumno };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al buscar el alumno" };
  }
}

export async function buscarRutinaPorAlumno(nombre: string): Promise<Resultado<RutinaConComentariosAtencion>> {
  try {
    const doc = await db.collection(COLECCION).doc(nombre).get();
    if (!doc.exists) return { ok: false, error: "El alumno no existe" };

    const data = doc.data();
    const rutinas = data?.rutinas;
    const comentarios = data?.comentarios ?? "";
    const atencion = data?.comentarios ?? "";

    if (!rutinas) return { ok: false, error: "El alumno no tiene rutinas asignadas" };

    return { ok: true, data: { rutinas, comentarios, atencion } };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al buscar las rutinas" };
  }
}

export async function buscarDiaPorAlumno(nombre: string, dia: string): Promise<Resultado<Rutina>> {
  try {
    const doc = await db.collection(COLECCION).doc(nombre).get();
    if (!doc.exists) return { ok: false, error: "El alumno no existe" };

    const data = doc.data() as Alumno;
    const rutinaDelDia = data.rutinas.find(r => r.dia.toLowerCase() === dia.toLowerCase());

    if (!rutinaDelDia) return { ok: false, error: `No hay rutina para el día ${dia}` };

    return { ok: true, data: rutinaDelDia };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al buscar la rutina del día" };
  }
}

export async function borrarAlumno(nombre: string): Promise<Resultado<void>> {
  try {
    const doc = await db.collection(COLECCION).doc(nombre).get();
    if (!doc.exists) return { ok: false, error: "El alumno no existe" };

    await doc.ref.delete();
    return { ok: true, data: undefined };
  } catch (error: any) {
    return { ok: false, error: error.message || "Error al borrar el alumno" };
  }
}
