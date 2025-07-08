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

export type MensajeImportador = {
  type: "fila";
  payload: {
    nombre: string;
    atencion: string;
    sugerencia: string;
    nuevoNivel: string;
    motivoCambio: string;
    ultimaModPor: string;
    profeEncargado: string;
    comentarios: string;
    rutina: string;
  };
};