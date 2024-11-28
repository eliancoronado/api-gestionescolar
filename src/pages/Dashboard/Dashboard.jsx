import { useEffect, useState } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allstudents, setAllstudents] = useState(null);
  const [allmaterias, setAllmaterias] = useState(null);
  const [allteachers, setAllteachers] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Alternar el estado del sidebar
  };

  const handleMove = () => {
    navigate(`/slcgrado`);
  };

  const handletoMaterias = () => {
    navigate(`/materias`);
  };

  const handletoEvaluaciones = () => {
    navigate(`/evaluar`);
  };

  const handletoteachers = () => {
    navigate(`/teachers`);
  };

  useEffect(() => {
    const totalEstudiantes = async () => {
      try {
        const response = await axios.get(
          `https://api-gestionescolar-backend.onrender.com/allstudents`
        );
        setAllstudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error al obtener todos los estudiantes", error);
      }
    };
    totalEstudiantes();
  }, []);

  useEffect(() => {
    const totalMaterias = async () => {
      try {
        const response = await axios.get(
          `https://api-gestionescolar-backend.onrender.com/materias/allmaterias`
        );
        setAllmaterias(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error al obtener todas las materias", error);
      }
    };
    totalMaterias();
  }, []);

  useEffect(() => {
    const totalDocentes = async () => {
      try {
        const response = await axios.get(
          `https://api-gestionescolar-backend.onrender.com/profesores/all`
        );
        setAllteachers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error al obtener todas las materias", error);
      }
    };
    totalDocentes();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Botón de menú en pantallas pequeñas */}
      <button
        className="lg:hidden p-4 bg-indigo-600 text-white"
        onClick={toggleSidebar} // Llamamos a la función que alterna el estado
      >
        <FaBars />
      </button>

      {/* Barra lateral */}
      <div
        className={`lg:w-64 bg-indigo-600 text-white p-6 transition-transform duration-300 ${
          sidebarOpen ? "transform-none" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative inset-0 z-10`}
      >
        {/* Botón para cerrar el sidebar */}
        <button
          className="absolute top-4 right-4 lg:hidden p-2 text-white"
          onClick={toggleSidebar} // Llamamos a la función para cerrar el sidebar
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Gestión Escolar</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="/slcgrado"
                className="flex items-center text-lg hover:bg-indigo-500 p-2 rounded-lg"
              >
                <FaUsers className="mr-3" />
                Estudiantes
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/teachers"
                className="flex items-center text-lg hover:bg-indigo-500 p-2 rounded-lg"
              >
                <FaChalkboardTeacher className="mr-3" />
                Docentes
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/materias"
                className="flex items-center text-lg hover:bg-indigo-500 p-2 rounded-lg"
              >
                <FaBook className="mr-3" />
                Materias
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/evaluar"
                className="flex items-center text-lg hover:bg-indigo-500 p-2 rounded-lg"
              >
                <FaClipboardList className="mr-3" />
                Evaluaciones
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/agstudents"
                className="flex items-center text-lg hover:bg-indigo-500 p-2 rounded-lg"
              >
                <FaUserPlus className="mr-3" />
                Agregar Estudiantes
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Bienvenido al Dashboard</h1>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjetas */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:scale-110 transition-all"
            onClick={handleMove}
          >
            <div className="bg-indigo-500 p-4 rounded-full text-white">
              <FaUsers size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Estudiantes</h3>
              <p className="text-gray-500">{allstudents} Alumnos</p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:scale-110 transition-all"
            onClick={handletoteachers}
          >
            <div className="bg-indigo-500 p-4 rounded-full text-white">
              <FaChalkboardTeacher size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Docentes</h3>
              <p className="text-gray-500">{allteachers} docentes</p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:scale-110 transition-all"
            onClick={handletoMaterias}
          >
            <div className="bg-indigo-500 p-4 rounded-full text-white">
              <FaBook size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Materias</h3>
              <p className="text-gray-500">{allmaterias} materias</p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:scale-110 transition-all"
            onClick={handletoEvaluaciones}
          >
            <div className="bg-indigo-500 p-4 rounded-full text-white">
              <FaClipboardList size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Evaluaciones</h3>
              <p className="text-gray-500">Aqui puedes evaluar</p>
            </div>
          </div>
        </div>

        {/* Gráfico o contenido adicional */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gráfico de Notas</h2>
          <div className="bg-gray-200 h-64 flex justify-center items-center text-gray-500">
            Gráfico de Notas (Aquí va el gráfico o contenido adicional)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
