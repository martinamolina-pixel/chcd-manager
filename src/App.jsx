import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Solicitudes from "./pages/Solicitudes";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import Administracion from "./pages/Administracion";
import Login from "./pages/Login";

import "./App.css";

function App() {
  // Estado global del usuario logueado. null significa que no ha iniciado sesión.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("chcd_session");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("chcd_session", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("chcd_session");
  };

  // Si no está logueado, forzar renderizado de la pantalla de Login únicamente
  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Pasamos el usuario para que el menú se auto-filtre */}
        <Sidebar user={user} onLogout={handleLogout} />

        <div className="content-area">
          <Header user={user} />

          <main className="main-content">
            <Routes>
              {/* Si es Admin va al Dashboard, si es Encargada va directo a Nueva Solicitud */}
              <Route
                path="/"
                element={
                  user.role === "admin" ? <Dashboard /> : <Navigate to="/solicitudes/nueva" replace />
                }
              />

              {/* Rutas Protegidas del Admin */}
              <Route
                path="/inventario"
                element={user.role === "admin" ? <Inventario /> : <Navigate to="/solicitudes/nueva" replace />}
              />
              <Route
                path="/administracion"
                element={user.role === "admin" ? <Administracion /> : <Navigate to="/solicitudes/nueva" replace />}
              />

              {/* Rutas compartidas o exclusivas de carga */}
              <Route path="/solicitudes" element={<Solicitudes user={user} />} />
              <Route path="/solicitudes/nueva" element={<NuevaSolicitud user={user} />} />

              {/* Redirección por si escriben cualquier ruta extraña */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;