export interface Rutina {
  dia: string;
  ejercicios: string[];
}


//firebase no acepta vacios
export interface Alumno {
  nombre: string;
  comentarios: string;
  rutinas: Rutina[];
  atencion: string;
  sugerencia: boolean;
  nuevoNivel: string;
  motivoCambio: string;
  ultimaModificacionPor: string;
  profeEncargado: string;
}
