import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Asegúrate de importar axios
import { FaArrowLeft } from "react-icons/fa6";

const Grado = () => {
  const { grado } = useParams();
  const [estudiantes, setEstudiantes] = useState([]); // Datos de la base de datos
  const [curso, setCurso] = useState("7A");
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Obtener los estudiantes desde la base de datos
  const fetchEstudiantes = async (gradoseleccionado) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api-gestionescolar-backend.onrender.com/estudiantes/${gradoseleccionado}`
      );
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")
    ) {
      try {
        await axios.delete(
          `https://api-gestionescolar-backend.onrender.com/estudiantes/${id}`
        );
        // Actualizar la lista de estudiantes después de eliminar
        setEstudiantes(
          estudiantes.filter((estudiante) => estudiante._id !== id)
        );
        alert("Estudiante eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        alert("Error al eliminar estudiante");
      }
    }
  };

  useEffect(() => {
    if (grado) {
      setCurso(grado);
      fetchEstudiantes(grado);
    }
  }, [grado]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        Gestión de Estudiantes
      </h1>

      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      {/* Contenedor de la tabla */}
      <div className="w-full h-[85vh] max-w-5xl bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-xs">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-2 py-1">No</th>
              <th className="px-2 py-1">Nombre</th>
              {/* Cabecera dinámica de materias */}
              {estudiantes.length > 0 &&
                Object.keys(estudiantes[0].notas).map((materia) => (
                  <th key={materia} className="px-2 py-1 text-center">
                    {materia}
                  </th>
                ))}
              <th className="px-2 py-1 text-center">Opciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {estudiantes
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((estudiante, index) => (
                <tr key={estudiante._id} className="hover:bg-indigo-50">
                  <td className="px-2 py-1 text-center">{index + 1}</td>
                  <td className="px-2 py-1 text-left">{estudiante.nombre}</td>
                  {/* Celdas dinámicas de las notas */}
                  {Object.keys(estudiante.notas).map((materia) => (
                    <td key={materia} className="px-2 py-1 text-center">
                      {estudiante.notas[materia]}
                    </td>
                  ))}
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => handleEliminar(estudiante._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="mt-4 text-sm text-gray-500">Cargando...</p>}
      {!loading && estudiantes.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">
          No hay estudiantes registrados.
        </p>
      )}
    </div>
  );
};

export default Grado;
