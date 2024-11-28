import React from "react";
import Home from "./sections/Home";
import Navbar from "./components/Navbar";
import FileUpload from "./pages/uploads/UploadPage";
import GestionNotas from "./pages/gestion/GestionNotas";
import SeleccionGrado from "./pages/seleccion/SeleccionGrado";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Grado from "./pages/grado/Grado";
import Dashboard from "./pages/Dashboard/Dashboard";
import Materias from "./pages/Materias/Materias";
import AgregarProfesor from "./pages/teachers/AgregarProfesor";
import Register from "./Register";
import Login from "./Login";
import GNotas from "./pages/app/GNotas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/slcgrado" element={<SeleccionGrado />} />
        <Route path="/agstudents" element={<FileUpload />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/teachers" element={<AgregarProfesor />} />
        <Route path="/evaluar" element={<GestionNotas />} />
        <Route path="/:grado" element={<Grado />} />
        <Route path="/app-teacher" element={<GNotas />} />
      </Routes>
    </Router>
  );
}

export default App;
