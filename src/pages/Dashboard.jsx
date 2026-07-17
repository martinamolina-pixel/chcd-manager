import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Datos simulados (KPIs reales del centro)
  const metrics = {
    solicitudesPendientes: 5,
    insumosCriticos: 12,
    laboratoriosHoy: 4
  };

  const proximosLaboratorios = [
    { id: 1, carrera: "Enfermería", taller: "Punción Venosa", hora: "09:00", sala: "Box 3" },
    { id: 2, carrera: "Medicina", taller: "Suturas Avanzadas", hora: "11:30", sala: "Pabellón Simulados" },
    { id: 3, carrera: "Obstetricia", taller: "Atención del Parto", hora: "15:00", sala: "Sala Ginecología" },
  ];

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h1>Panel de Gestión CHCD</h1>
        <p className="subtitle">Sistema de control operativo y recursos docentes</p>
      </header>

      {/* Tarjetas de Métricas de Control Rápido */}
      <div className="metrics-grid">
        <div className="metric-card warning" onClick={() => navigate("/solicitudes")}>
          <div className="metric-icon">📋</div>
          <div className="metric-info">
            <h3>{metrics.solicitudesPendientes}</h3>
            <p>Solicitudes Pendientes</p>
          </div>
        </div>

        <div className="metric-card danger" onClick={() => navigate("/inventario")}>
          <div className="metric-icon">⚠️</div>
          <div className="metric-info">
            <h3>{metrics.insumosCriticos}</h3>
            <p>Insumos con Stock Crítico</p>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">🧪</div>
          <div className="metric-info">
            <h3>{metrics.laboratoriosHoy}</h3>
            <p>Talleres Programados Hoy</p>
          </div>
        </div>
      </div>

      {/* Contenido Seccionado: Accesos Rápidos + Agenda */}
      <div className="dashboard-content-layout">
        
        {/* Próximas actividades clínicas */}
        <div className="dashboard-section-card">
          <h2>Agenda de Talleres para Hoy</h2>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Carrera</th>
                  <th>Taller / Actividad</th>
                  <th>Ubicación</th>
                </tr>
              </thead>
              <tbody>
                {proximosLaboratorios.map((lab) => (
                  <tr key={lab.id}>
                    <td><span className="badge-time">{lab.hora}</span></td>
                    <td><strong>{lab.carrera}</strong></td>
                    <td>{lab.taller}</td>
                    <td>{lab.sala}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Módulos de gestión directa */}
        <div className="dashboard-section-card quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="btn-action primary" onClick={() => navigate("/solicitudes/nueva")}>
              ➕ Nueva Solicitud de Insumos
            </button>
            <button className="btn-action secondary" onClick={() => navigate("/inventario")}>
              📦 Ver Catálogo Completo
            </button>
            <button className="btn-action outline" onClick={() => navigate("/administracion")}>
              ⚙️ Despachar Pedidos
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;