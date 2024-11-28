import React, { useState } from "react";
import axios from "axios";
import { FaFileExcel } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function FileUpload() {
  const [file, setFile] = useState(null); // Archivo seleccionado
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Manejar selección de archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Subir el archivo al backend
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Archivo subido exitosamente");
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Error al subir el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <button
        onClick={() => window.history.back()} // Navega hacia atrás en el historial
        className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-200 absolute top-2 left-2 font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Icono de flecha */}
        Volver
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Gestión de Estudiantes - Subir Excel
      </h1>

      {/* Formulario de carga de archivos */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center w-full max-w-sm"
      >
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-indigo-600 rounded-md cursor-pointer hover:bg-indigo-100 transition-all"
          >
            <FaFileExcel className="text-3xl text-indigo-600 mr-2" />
            <span className="text-gray-700">Seleccionar archivo</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
          disabled={loading}
        >
          {loading ? "Subiendo..." : "Subir Archivo"}
        </button>
      </form>

      {/* Mensaje de carga */}
      {loading && (
        <p className="text-center mt-4 text-gray-600">Subiendo archivo...</p>
      )}
    </div>
  );
}

export default FileUpload;
