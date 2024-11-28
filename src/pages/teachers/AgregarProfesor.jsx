import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

const AgregarProfesor = () => {
  // Estados
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [grado, setGrado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);

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

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get("http://localhost:3000/materias");
        setMaterias(response.data);
      } catch (error) {
        console.error("Error al obtener materias:", error);
      }
    };
    fetchMaterias();
  }, []);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profesores");
        setProfesores(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener profesores:", error);
      }
    };
    fetchProfesores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/profesores", {
        nombre,
        materia,
        grado,
      });
      console.log(...profesores, response);
      setProfesores([...profesores, response.data.profesor]);
      alert(
        `Profesor agregado correctamente.\nUsuario: ${response.data.profesor.usuario}\nContraseña: ${response.data.profesor.contraseña}`
      );
      setNombre("");
      setMateria("");
      setGrado("");
    } catch (error) {
      console.error("Error al agregar profesor:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este profesor?")) {
      try {
        await axios.delete(`http://localhost:3000/profesores/${id}`);
        setProfesores(profesores.filter((profesor) => profesor._id !== id));
        alert("Profesor eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar profesor:", error);
        alert("Error al eliminar profesor");
      }
    }
  };

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Agregar Profesor
      </h2>

      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Profesor"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Selecciona una Materia</option>
          {materias.map((m) => (
            <option key={m._id} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </select>
        <select
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Selecciona un Grado</option>
          {grados.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Agregar Profesor
        </button>
      </form>

      <h3 className="text-xl font-semibold text-gray-700 mt-8">
        Lista de Profesores
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border border-gray-300">Nombre</th>
              <th className="p-3 border border-gray-300">Materia</th>
              <th className="p-3 border border-gray-300">Grado</th>
              <th className="p-3 border border-gray-300">Usuario</th>
              <th className="p-3 border border-gray-300">Contraseña</th>
              <th className="p-3 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((profesor) => (
              <tr key={profesor._id} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-300 text-center">
                  {profesor.nombre}
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  {profesor.materia}
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  {profesor.grado}
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  {profesor.usuario}
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  {profesor.contraseña}
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  <button
                    onClick={() => handleEliminar(profesor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgregarProfesor;
