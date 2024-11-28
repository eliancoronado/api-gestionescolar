import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

function Materias() {
  const [materia, setMateria] = useState(""); // Estado para la materia
  const [materias, setMaterias] = useState([]); // Estado para la lista de materias
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando

  // Función para obtener las materias desde el backend
  const fetchMaterias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/materias");
      setMaterias(response.data); // Guardamos las materias en el estado
    } catch (error) {
      console.error("Error al obtener las materias:", error);
    } finally {
      setLoading(false); // Terminamos el estado de carga
    }
  };

  useEffect(() => {
    fetchMaterias(); // Obtener las materias cuando el componente se monta
  }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar

  // Manejar el cambio en el input de texto
  const handleMateriaChange = (event) => {
    setMateria(event.target.value);
  };

  const handleAddMateria = async () => {
    if (materia.trim() === "") {
      alert("Por favor, ingresa el nombre de la materia.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/materias", { nombre: materia });
      setMateria(""); // Limpiar el input
      alert("Materia agregada exitosamente");
      fetchMaterias(); // Actualizar la lista de materias
    } catch (error) {
      console.error("Error al agregar materia:", error);
      alert("Hubo un error al agregar la materia.");
    }
  };

  // Función para eliminar una materia
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
      try {
        await axios.delete(`http://localhost:3000/materias/${id}`);
        // Filtramos las materias eliminadas
        setMaterias(materias.filter((materia) => materia._id !== id));
        alert("Materia eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la materia:", error);
        alert("Error al eliminar la materia.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center  p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Agregar Materias
      </h1>

      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      {/* Formulario para agregar materia */}
      <div className="flex flex-col items-center mb-6 w-full max-w-md">
        <input
          type="text"
          value={materia}
          onChange={handleMateriaChange}
          placeholder="Nombre de la materia"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddMateria}
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
        >
          Agregar
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Lista de Materias
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando materias...</p>
        ) : (
          <>
            {materias.length === 0 ? (
              <p className="text-center text-gray-600">
                No hay materias registradas.
              </p>
            ) : (
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-3 text-left">No</th>
                    <th className="px-4 py-3 text-left">Materia</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {materias.map((materia, index) => (
                    <tr
                      key={materia._id}
                      className={`${
                        index % 2 === 0 ? "bg-blue-50" : "bg-white"
                      } hover:bg-blue-100 transition-all`}
                    >
                      <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        {materia.nombre}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleEliminar(materia._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm transition duration-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Materias;
