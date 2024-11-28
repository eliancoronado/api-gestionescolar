import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Si usas react-router para navegación

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [grado, setGrado] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Llamada a tu API para registrar el profesor
    try {
      const response = await fetch("http://localhost:3000/profesores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, materia, grado }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("Profesor registrado exitosamente");
        navigate.push("/login"); // Redirige a la página de login después de registrarse
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar al profesor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Crea tu Sistema
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="nombre"
              className="text-sm font-medium text-indigo-600 mb-2"
            >
              Nombre del Sistema
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nombre del Sistema"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="contraseña"
              className="text-sm font-medium text-indigo-600 mb-2"
            >
              Contraseña
            </label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contraseña"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿Ya tienes uno?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Inicia sesión
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ¿Eres profesor?{" "}
            <a
              href="/login-teacher"
              className="text-indigo-600 font-medium hover:underline"
            >
              Entrar ahora!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
