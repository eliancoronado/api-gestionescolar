import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-gestionescolar-backend.onrender.com/auth/login",
        {
          usuario,
          contraseña,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.profesor.id);
      navigate("/app-teacher");
    } catch (error) {
      alert("Hubo un error al iniciar sesión.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Entrar como profesor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="usuario"
              className="text-sm font-medium text-indigo-600 mb-2"
            >
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu usuario"
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
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿Quieres crear un sistema?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Crealo aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
