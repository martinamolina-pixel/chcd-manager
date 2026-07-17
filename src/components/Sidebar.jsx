import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CHCD Manager</h2>
        <span className="user-title">{user.label}</span>
        <span className="user-name">👤 {user.name}</span>
      </div>

      <nav>
        {user.role === "admin" && (
          <div>
            <p className="menu-section">Administrador</p>
            <NavLink to="/" className="menu">📊 Panel Central</NavLink>
            <NavLink to="/inventario" className="menu">📦 Inventario Global</NavLink>
            <NavLink to="/planificacion" className="menu">📅 Planificación General</NavLink>
          </div>
        )}

        <div>
          <p className="menu-section">Solicitudes</p>
          <NavLink to="/solicitudes/nueva" className="menu">➕ Cargar Pedido</NavLink>
          <NavLink to="/solicitudes" className="menu">📋 Historial de Estados</NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={() => { onLogout(); navigate("/login"); }}>
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;