class Alumno{
    constructor(nombre, apellidos, edad){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasIncritas = []
        this.calificaciones = {}
    
    }

    inscribirMateria(materia){
        this.materiasIncritas.push(materia);
    }

    asignarCalificacion(materia, calificacion){
        this.calificaciones[materia] = calificacion;
    }

    obtenerPromedio(){
        const calificaciones = Object.values(this.calificaciones);
        if (calificaciones.length === 0) return null;
        const sum = calificaciones.reduce((acc, curr) => acc + curr, 0);
        return sum / calificaciones.length;
    }
}

class Grupo {
    constructor(nombre) {
      this.nombre = nombre;
      this.alumnos = [];
    }
  
    agregarAlumno(alumno) {
      this.alumnos.push(alumno);
    }
  
    obtenerPromedioGrupo() {
      const promedios = this.alumnos.map((alumno) => alumno.obtenerPromedio());
      const promediosValidos = promedios.filter((promedio) => promedio !== null);
      if (promediosValidos.length === 0) return null;
      const sum = promediosValidos.reduce((acc, curr) => acc + curr, 0);
      return sum / promediosValidos.length;
    }
  }
  
function buscarPorNombre(alumnos, nombre) {
    return alumnos.filter((alumno) => alumno.nombre === nombre);
  }
  
  function buscarPorApellido(alumnos, apellido) {
    return alumnos.filter((alumno) => alumno.apellidos === apellido);
  }
  
  function obtenerListaOrdenadaPorCalificacion(alumnos, reverse = false) {
    return alumnos.sort((a, b) => {
      const promedioA = a.obtenerPromedio() || 0;
      const promedioB = b.obtenerPromedio() || 0;
      return reverse ? promedioB - promedioA : promedioA - promedioB;
    });
  }


  const alumno1 = new Alumno("Juan", "Perez", 20);
  const alumno2 = new Alumno("Maria", "Gonzalez", 21);
  const alumno3 = new Alumno("Pedro", "Lopez", 22);
  const alumno4 = new Alumno("Pedro", "Lopez", 24);
  const alumno5 = new Alumno("Pedro", "Lopez", 21);
  const alumno6 = new Alumno("Pedro", "Lopez", 26);
  
  const grupoA = new Grupo("Grupo A");
  grupoA.agregarAlumno(alumno1);
  grupoA.agregarAlumno(alumno2);
  grupoA.agregarAlumno(alumno3);
  
  const grupoB = new Grupo("Grupo B");
  grupoA.agregarAlumno(alumno4);
  grupoA.agregarAlumno(alumno5);
  grupoA.agregarAlumno(alumno6);

  alumno1.inscribirMateria("Matematicas");
  alumno1.asignarCalificacion("Matematicas", 100);
  alumno2.inscribirMateria("Matematicas");
  alumno2.asignarCalificacion("Matematicas", 85);
  alumno3.inscribirMateria("Matematicas");
  alumno3.asignarCalificacion("Matematicas", 95);
  
  console.log("Promedio del Grupo A:", grupoA.obtenerPromedioGrupo());
  console.log("Buscar por nombre:", buscarPorNombre(grupoA.alumnos, "Juan"));
  console.log("Buscar por apellido:", buscarPorApellido(grupoA.alumnos, "Perez"));
  console.log("Lista de alumnos ordenados por calificacion ascendente:", obtenerListaOrdenadaPorCalificacion(grupoA.alumnos));
  console.log("Lista de alumnos ordenados por calificacion descendente:", obtenerListaOrdenadaPorCalificacion(grupoA.alumnos, true));
