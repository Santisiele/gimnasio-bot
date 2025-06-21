import { db } from "../firebase";
import { Alumno } from "../models/Alumno";

const COLLECTION = "alumnos";

export async function guardarAlumno(alumno: Alumno) {
  await db.collection(COLLECTION).doc(alumno.nombre).set(alumno);
}

export async function buscarAlumno(nombre: string): Promise<Alumno | null> {
  const doc = await db.collection(COLLECTION).doc(nombre).get();
  if (!doc.exists) return null;
  return doc.data() as Alumno;
}
