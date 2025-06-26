import { db } from "../firebase";
import { Alumno } from "../models/Alumno";
import { Rutina } from "../models/Alumno";

const COLECCION = "alumnos";

export async function guardarAlumnoCompleto(alumno: Alumno) {
  await db.collection(COLECCION).doc(alumno.nombre).set(alumno);
}

export async function buscarAlumnoCompleto(nombre: string): Promise<Alumno | null> {
  const doc = await db.collection(COLECCION).doc(nombre).get();
  if (!doc.exists) return null;
  return doc.data() as Alumno;
}

export async function buscarRutinaPorAlumno(nombre: string): Promise<Rutina[] | null> {
  const doc = await db.collection(COLECCION).doc(nombre).get();
  if (!doc.exists) return null;

  const data = doc.data();
  return data?.rutinas ?? null;
}

export async function buscarDiaPorAlumno(nombre: string, dia: string): Promise<Rutina | null> {
  const doc = await db.collection(COLECCION).doc(nombre).get();
  if (!doc.exists) return null;

  const data = doc.data() as Alumno;
  const rutinaDelDia = data.rutinas.find(r => r.dia.toLowerCase() === dia.toLowerCase());

  return rutinaDelDia ?? null;
}