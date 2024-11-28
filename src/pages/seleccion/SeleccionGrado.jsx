import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

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

const SeleccionGrado = () => {
  const navigate = useNavigate();

  const handleGradoClick = (grado) => {
    navigate(`/${grado}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 text-center">
        Selecciona un Grado
      </h1>

      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {grados.map((grado) => (
          <button
            key={grado}
            onClick={() => handleGradoClick(grado)}
            className="bg-white text-indigo-700 text-xl md:text-2xl font-semibold py-4 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            {grado}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeleccionGrado;
4;
