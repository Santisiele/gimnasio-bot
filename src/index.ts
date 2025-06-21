import { guardarAlumno, buscarAlumno } from './services/AlumnoService';

// Prueba para guardar un alumno
async function main() {
  await guardarAlumno({
    nombre: "Juan Pérez",
    comentarios: "Lesión de rodilla",
    rutinas: [
      {
        dia: "Lunes",
        ejercicios: [
          { nombre: "Prensa", series: "4x10", peso: "80kg" },
          { nombre: "Bicicleta", tiempo: "15min" }
        ]
      },
      {
        dia: "Miércoles",
        ejercicios: [
          { nombre: "Curl de bíceps", series: "3x12", peso: "20kg" }
        ]
      }
    ]
  });

  const alumno = await buscarAlumno("Juan Pérez");
  console.log("Resultado de la búsqueda:", alumno);
}

main();
