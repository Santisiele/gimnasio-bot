export interface Ejercicio {
  nombre: string;
  series?: string;
  peso?: string;
  tiempo?: string;
}

export interface Rutina {
  dia: string;
  ejercicios: Ejercicio[];
}

export interface Alumno {
  nombre: string;
  comentarios?: string;
  rutinas: Rutina[];
}
