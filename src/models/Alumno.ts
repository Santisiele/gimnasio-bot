export interface Rutina {
  dia: string;
  ejercicios: string[];
}

export interface Alumno {
  nombre: string;
  comentarios?: string;
  rutinas: Rutina[];
  atencion?: number;
  sugerencia?: boolean;
  nuevoNivel?: string;
  motivoCambio?: string;
  ultimaModificacionPor?: string;
  profeEncargado?: string;
}
