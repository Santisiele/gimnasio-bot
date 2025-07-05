import { Rutina } from "@/models/Alumno";

export type Resultado<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: string;
};

export type RutinaConComentariosAtencion = {
  rutinas: Rutina[];
  comentarios: string;
  atencion: string;
};