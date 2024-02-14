document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function(navLink) {
      navLink.addEventListener("click", function(event) {
          event.preventDefault();

          const targetId = navLink.getAttribute("href").substring(1);

          document.querySelectorAll(".seccion").forEach(function(section) {
              section.classList.add("oculto");
          });

          document.getElementById(targetId).classList.remove("oculto");
      });
  });

  // Obtener el formulario de registro y el formulario de materias
  const formRegistro = document.getElementById('formRegistro');
  const formMaterias = document.getElementById('formMaterias');

  // Definir un objeto global para almacenar los datos del alumno
  let nuevoAlumno = null;

  // Event listener para el formulario de registro
  formRegistro.addEventListener("submit", function(event) {
      event.preventDefault();

      const nombre = formRegistro.querySelector('input[name="nombre"]').value;
      const apellido = formRegistro.querySelector('input[name="apellido"]').value;
      const edad = formRegistro.querySelector('input[name="edad"]').value;

      if (!nombre || !apellido || !edad) {
          alert("Por favor completa todos los campos.");
          return;
      }

      nuevoAlumno = new Alumno(nombre, apellido, edad);

      // Asignar un grupo aleatorio
      const grupos = ['Grupo A', 'Grupo B', 'Grupo C'];
      const grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)];
      nuevoAlumno.asignarGrupo(grupoAleatorio);
      
      window.location.href = "#materias";
      
      
      document.getElementById("inscripcion").classList.add("oculto");
      document.getElementById("materias").classList.remove("oculto");
    });

  // Event listener para el formulario de materias
  formMaterias.addEventListener("submit", function(event) {
      event.preventDefault();

      const materiasSeleccionadas = formMaterias.querySelectorAll('input[name="materias"]:checked');

      if (materiasSeleccionadas.length === 0) {
          alert("Por favor selecciona al menos una materia.");
          return;
      }

      const materias = Array.from(materiasSeleccionadas).map(input => input.value);

      // Inscribir al alumno en las materias seleccionadas y asignar calificaciones
      materias.forEach(materia => {
          nuevoAlumno.inscribirMateria(materia);
          // Simplemente asignamos una calificación aleatoria para el ejemplo
          const calificacion = Math.floor(Math.random() * 100) + 1; // Generar un número aleatorio entre 1 y 100
          nuevoAlumno.asignarCalificacion(materia, calificacion);
      });

      // Limpiar el formulario de materias
      formMaterias.reset();

      // Actualizar la fila del alumno en la tabla de alumnos con el promedio recalculado
      agregarAlumnoATabla(nuevoAlumno);

      // Mostrar un mensaje de éxito
      alert("¡Materias inscritas correctamente!");

      // Enfoque en el formulario de registro para facilitar el siguiente registro
      formRegistro.querySelector('input[name="nombre"]').focus();
  });

  // Función para agregar un alumno a la tabla de alumnos
  function agregarAlumnoATabla(alumno) {
      const tablaAlumnos = document.querySelector("#tabla-alumnos tbody");

      const fila = document.createElement("tr");
      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = alumno.nombre;
      const celdaApellido = document.createElement("td");
      celdaApellido.textContent = alumno.apellido;
      const celdaEdad = document.createElement("td");
      celdaEdad.textContent = alumno.edad;
      const celdaMaterias = document.createElement("td");
      celdaMaterias.textContent = alumno.materiasInscritas;
      const celdaPromedio = document.createElement("td");
      celdaPromedio.textContent = alumno.obtenerPromedio();
      const celdaGrupo = document.createElement("td");
      celdaGrupo.textContent = alumno.grupo;


      fila.appendChild(celdaNombre);
      fila.appendChild(celdaApellido);
      fila.appendChild(celdaEdad);
      fila.appendChild(celdaMaterias);
      fila.appendChild(celdaPromedio);
      fila.appendChild(celdaGrupo);

      tablaAlumnos.appendChild(fila);
  }
  

  // Clase Alumno
  class Alumno {
      constructor(nombre, apellido, edad) {
          this.nombre = nombre;
          this.apellido = apellido;
          this.edad = edad;
          this.materiasInscritas = [];
          this.calificaciones = {};
          this.grupo = '';
      }

      inscribirMateria(materia) {
          this.materiasInscritas.push(materia);
      }

      asignarCalificacion(materia, calificacion) {
          this.calificaciones[materia] = calificacion;
      }

      asignarGrupo(grupo) {
        this.grupo = grupo;
      }

      obtenerPromedio() {
          const calificaciones = Object.values(this.calificaciones);
          if (calificaciones.length === 0) return null;
          const sum = calificaciones.reduce((acc, curr) => acc + curr, 0);
          return sum / calificaciones.length;
      }
  }

  // Clase Grupo
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

  //alumnos y grupos
  const alumno1 = new Alumno("Juan", "Perez", 20);
  const alumno2 = new Alumno("Maria", "Gonzalez", 21);
  const alumno3 = new Alumno("Pedro", "Lopez", 22);
  const alumno4 = new Alumno("Lucia", "Aldana", 24);
  const alumno5 = new Alumno("Antoni", "Tellez", 21);
  const alumno6 = new Alumno("Luis", "Orduña", 23);

  const grupoA = new Grupo("Grupo A");
  grupoA.agregarAlumno(alumno1);
  grupoA.agregarAlumno(alumno2);
  grupoA.agregarAlumno(alumno3);
  
  const grupoB = new Grupo("Grupo B");
  grupoB.agregarAlumno(alumno4);
  grupoB.agregarAlumno(alumno5);
  
  
  const grupoC = new Grupo("Grupo C");
  grupoC.agregarAlumno(alumno6);
  
  // Asignar materias y calificaciones a los alumnos
  alumno1.asignarGrupo("Grupo A")
  alumno1.inscribirMateria("Matematicas");
  alumno1.asignarCalificacion("Matematicas", 100);
  alumno1.inscribirMateria("Historia");
  alumno1.asignarCalificacion("Historia", 90);
  alumno1.inscribirMateria("Literatura");
  alumno1.asignarCalificacion("Literatura", 80);
  
  alumno2.asignarGrupo("Grupo A")
  alumno2.inscribirMateria("Matematicas");
  alumno2.asignarCalificacion("Matematicas", 85);
  alumno2.inscribirMateria("Historia");
  alumno2.asignarCalificacion("Historia", 90);
  
  alumno3.asignarGrupo("Grupo A")
  alumno3.inscribirMateria("Matematicas");
  alumno3.asignarCalificacion("Matematicas", 95);
  alumno3.inscribirMateria("Informartica");
  alumno3.asignarCalificacion("Informartica", 90);

  alumno4.asignarGrupo("Grupo B")
  alumno4.inscribirMateria("Matematicas");
  alumno4.asignarCalificacion("Matematicas", 75);
  alumno4.inscribirMateria("Informatica");
  alumno4.asignarCalificacion("Informatica", 95);

  alumno5.asignarGrupo("Grupo B")
  alumno5.inscribirMateria("Matematicas");
  alumno5.asignarCalificacion("Matematicas", 80);
  alumno5.inscribirMateria("Idiomas");
  alumno5.asignarCalificacion("Idiomas", 78);

  alumno6.asignarGrupo("Grupo C")
  alumno6.inscribirMateria("Matematicas");
  alumno6.asignarCalificacion("Matematicas", 99);
  alumno6.inscribirMateria("Literatura");
  alumno6.asignarCalificacion("Literatura", 100);

  // Agregar cada alumno a la tabla de alumnos
  agregarAlumnoATabla(alumno1);
  agregarAlumnoATabla(alumno2);
  agregarAlumnoATabla(alumno3);
  agregarAlumnoATabla(alumno4);
  agregarAlumnoATabla(alumno5);
  agregarAlumnoATabla(alumno6);
  
  // Mostrar resultados en la consola
  console.log("Promedio del Grupo A:", grupoA.obtenerPromedioGrupo());
  console.log("Promedio del Grupo B:", grupoB.obtenerPromedioGrupo());
  console.log("Promedio del Grupo C:", grupoC.obtenerPromedioGrupo());
  
  // =================================== CalificacionPorGrupo ================================================
  
  
  // Grupo A
  let progresscircleA = document.getElementById("progressA");
  let percentageA = document.getElementById("percentageA");
  let cantidadA = 0;
  let cantidadMaximaA = 100; // Reemplaza con la cantidad máxima deseada
  
  let tiempoA = setInterval(() => {
      cantidadA += 1;
      let valoresA = Math.ceil((cantidadMaximaA -= 1));
      percentageA.textContent = cantidadA;
      progresscircleA.style.strokeDashoffset = `${valoresA}`;
      if (cantidadA >= cantidadMaximaA) {
          clearInterval(tiempoA);
      }
  }, 80);
  
  // Grupo B
  let progresscircleB = document.getElementById("progressB");
  let percentageB = document.getElementById("percentageB");
  let cantidadB = 0;
  let cantidadMaximaB = 100; // Reemplaza con la cantidad máxima deseada
  
  let tiempoB = setInterval(() => {
      cantidadB += 1;
      let valoresB = Math.ceil((cantidadMaximaB -= 1));
      percentageB.textContent = cantidadB;
      progresscircleB.style.strokeDashoffset = `${valoresB}`;
      if (cantidadB >= cantidadMaximaB) {
          clearInterval(tiempoB);
      }
  }, 80);
  
  // Grupo C
  let progresscircleC = document.getElementById("progressC");
  let percentageC = document.getElementById("percentageC");
  let cantidadC = 0;
  let cantidad2C = 630;
  
  let tiempoC = setInterval(() => {
      cantidadC += 1;
      let valoresC = Math.ceil((cantidad2C -= 6.3));
      percentageC.textContent = cantidadC;
      progresscircleC.style.strokeDashoffset = `${valoresC}`;
      if (cantidadC >= 100) {
          clearInterval(tiempoC);
      }
  }, 80);
});

