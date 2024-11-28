import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

const GestionNotas = () => {
  const [materia, setMateria] = useState("");
  const [materias, setMaterias] = useState([]);
  const [grado, setGrado] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalNotas, setModalNotas] = useState(false);
  const [modalCasilla, setModalCasilla] = useState(false);
  const [notas, setNotas] = useState(Array(10).fill(0)); // 10 casillas inicializadas en 0
  const [selectedCasilla, setSelectedCasilla] = useState(null);

  // Materias disponibles
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get(
          "https://api-gestionescolar-backend.onrender.com/materias"
        );
        setMaterias(response.data);
      } catch (error) {
        console.error("Error al obtener materias:", error);
      }
    };
    fetchMaterias();
  }, []);

  const grados = [
    "7A",
    "7B",
    "7C",
    "7D",
    "8A",
    "8B",
    "8C",
    "8D",
    "9A",
    "9B",
    "9C",
    "10A",
    "10B",
    "10C",
    "11A",
    "11B",
  ];

  // Obtener estudiantes según el grado seleccionado
  useEffect(() => {
    if (grado) {
      const fetchEstudiantes = async () => {
        try {
          const response = await axios.get(
            `https://api-gestionescolar-backend.onrender.com/estudiantes/${grado}`
          );
          setEstudiantes(response.data);
        } catch (error) {
          console.error("Error al obtener estudiantes:", error);
        }
      };
      fetchEstudiantes();
    }
  }, [grado]);

  // Función para redistribuir la nota entre las casillas
  const redistribuirNotas = (totalNota) => {
    const valoresPermitidos = [4, 6, 8, 10];
    const resultado = Array(10).fill(0);

    // Distribuir la nota en las casillas
    let restante = totalNota;

    for (let i = 0; i < resultado.length; i++) {
      for (let j = valoresPermitidos.length - 1; j >= 0; j--) {
        if (restante >= valoresPermitidos[j]) {
          resultado[i] = valoresPermitidos[j];
          restante -= valoresPermitidos[j];
          break;
        }
      }
    }

    return resultado;
  };

  // Modificar handlePonerNota para redistribuir la nota si ya existe
  const handlePonerNota = (estudiante) => {
    setSelectedStudent(estudiante);
    // Usar un efecto para asegurarse que selectedStudent se actualiza
    const notaExistente = estudiante?.notas?.[materia] || 0;

    if (notaExistente > 0) {
      const notasRedistribuidas = redistribuirNotas(notaExistente);
      setNotas(notasRedistribuidas);
    } else {
      setNotas(Array(10).fill(0));
    }

    setModalNotas(true);
  };

  // Abrir modal para seleccionar valor de casilla
  const handleCasillaClick = (index) => {
    setSelectedCasilla(index);
    setModalCasilla(true);
  };

  // Guardar valor seleccionado en la casilla
  const handleSeleccionarValor = (valor) => {
    const nuevasNotas = [...notas];
    nuevasNotas[selectedCasilla] = valor;
    setNotas(nuevasNotas);
    setModalCasilla(false);
  };

  // Guardar notas en el backend
  const handleGuardarNotas = async () => {
    try {
      const response = await axios.put(
        `https://api-gestionescolar-backend.onrender.com/estudiantes/${selectedStudent._id}/notas`,
        {
          materia,
          notas,
        }
      );
      console.log(
        "Estudiante:",
        selectedStudent,
        "Materia:",
        materia,
        "Notas:",
        notas
      );
      console.log("Respuesta del servidor:", response.data);
      alert("Notas guardadas correctamente");
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.map((estudiante) =>
          estudiante._id === selectedStudent._id
            ? response.data.estudiante
            : estudiante
        )
      );

      setModalNotas(false);
    } catch (error) {
      console.error("Error al guardar notas:", error);
      alert("Ocurrió un error al guardar las notas");
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 min-h-screen">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8 shadow-lg p-4 rounded">
        Gestión de Notas
      </h1>

      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      {/* Selects */}
      <div className="flex justify-center space-x-6 mb-6">
        <select
          className="border p-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        >
          <option value="">Selecciona Materia</option>
          {materias.map((mat) => (
            <option key={mat._id} value={mat.nombre}>
              {mat.nombre}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
        >
          <option value="">Selecciona Grado</option>
          {grados.map((grad) => (
            <option key={grad} value={grad}>
              {grad}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de estudiantes */}
      <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Nombres</th>
            <th className="border px-4 py-2">Nota de {materia}</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {estudiantes.map((estudiante, index) => (
            <tr
              key={estudiante._id}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : ""
              }`}
            >
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{estudiante.nombre}</td>
              <td className="border px-4 py-2 text-center">
                {estudiante.notas[materia] || 0}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handlePonerNota(estudiante)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Poner Nota
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modales */}
      {modalNotas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Asignar Notas a {selectedStudent.nombre}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {notas.map((nota, index) => (
                <button
                  key={index}
                  onClick={() => handleCasillaClick(index)}
                  className="border p-4 rounded text-center bg-gray-100 hover:bg-gray-300"
                >
                  {nota}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleGuardarNotas}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2 transition duration-300"
              >
                Guardar
              </button>
              <button
                onClick={() => setModalNotas(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para seleccionar valor */}
      {modalCasilla && (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-bold mb-4">Seleccionar Valor</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSeleccionarValor(4)}
                className="p-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                AI (4)
              </button>
              <button
                onClick={() => handleSeleccionarValor(6)}
                className="p-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                AF (6)
              </button>
              <button
                onClick={() => handleSeleccionarValor(8)}
                className="p-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                AS (8)
              </button>
              <button
                onClick={() => handleSeleccionarValor(10)}
                className="p-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                AA (10)
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalCasilla(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionNotas;
