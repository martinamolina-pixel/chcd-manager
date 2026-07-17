import { useState, useEffect } from "react";
import { carrerasData } from "../data/carrerasData";
import "../styles/solicitudes.css";

function NuevaSolicitud({ user }) {
  const carreraActiva = user.carrera === "administracion" ? "enfermeria" : user.carrera;
  const data = carrerasData[carreraActiva];

  const [profesional, setProfesional] = useState("");
  const [campoClinico, setCampoClinico] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [encargadaEntrega, setEncargadaEntrega] = useState("");
  const [cantEstudiantes, setCantEstudiantes] = useState(0);
  const [diasRotacion, setDiasRotacion] = useState(0);
  const [calculoInsumos, setCalculoInsumos] = useState([]);

  useEffect(() => {
    if (asignatura && cantEstudiantes > 0 && diasRotacion > 0) {
      const insumosBase = data.asignaturas[asignatura] || [];
      const calculados = insumosBase.map(item => ({
        ...item,
        totalFinal: cantEstudiantes * item.insumosPorDia * diasRotacion
      }));
      setCalculoInsumos(calculados);
    } else {
      setCalculoInsumos([]);
    }
  }, [asignatura, cantEstudiantes, diasRotacion, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaSolicitud = {
      id: Date.now(),
      carrera: data.nombre,
      profesional,
      campoClinico,
      asignatura,
      encargadaEntrega,
      estudiantes: cantEstudiantes,
      dias: diasRotacion,
      insumos: calculoInsumos,
      estado: "Pendiente" // No rebaja stock hasta ser aprobado como 'Entrega Finalizada'
    };

    const solicitudesActuales = JSON.parse(localStorage.getItem("solicitudes_chcd") || "[]");
    solicitudesActuales.push(nuevaSolicitud);
    localStorage.setItem("solicitudes_chcd", JSON.stringify(solicitudesActuales));

    alert("Solicitud cargada de forma exitosa en estado 'Pendiente'.");
    setAsignatura(""); setProfesional(""); setCampoClinico(""); setEncargadaEntrega("");
    setCantEstudiantes(0); setDiasRotacion(0);
  };

  return (
    <div className="solicitud-container">
      <h2>Módulo de Carga: {data.nombre}</h2>
      <form onSubmit={handleSubmit} className="solicitud-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Profesional UOH:</label>
            <select value={profesional} onChange={(e) => setProfesional(e.target.value)} required>
              <option value="">-- Seleccione Profesional --</option>
              {data.profesionales.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Campo Clínico:</label>
            <select value={campoClinico} onChange={(e) => setCampoClinico(e.target.value)} required>
              <option value="">-- Seleccione Campo --</option>
              {data.camposClinicos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Asignatura:</label>
            <select value={asignatura} onChange={(e) => setAsignatura(e.target.value)} required>
              <option value="">-- Seleccione Asignatura --</option>
              {Object.keys(data.asignaturas).map(asig => <option key={asig} value={asig}>{asig}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Encargada de Entrega Bodega:</label>
            <select value={encargadaEntrega} onChange={(e) => setEncargadaEntrega(e.target.value)} required>
              <option value="">-- Seleccione Encargada --</option>
              {data.encargadasEntrega.map(ee => <option key={ee} value={ee}>{ee}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>N° Estudiantes:</label>
            <input type="number" min="1" value={cantEstudiantes || ""} onChange={(e) => setCantEstudiantes(Number(e.target.value))} required />
          </div>

          <div className="form-group">
            <label>Días de Rotación:</label>
            <input type="number" min="1" value={diasRotacion || ""} onChange={(e) => setDiasRotacion(Number(e.target.value))} required />
          </div>
        </div>

        {calculoInsumos.length > 0 && (
          <div className="preview-stock-section">
            <h3>Previsualización del Despacho Requerido</h3>
            <table className="preview-table">
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>U. Medida</th>
                  <th>Cantidad Proyectada</th>
                </tr>
              </thead>
              <tbody>
                {calculoInsumos.map((ins, i) => (
                  <tr key={i}>
                    <td>{ins.insumo}</td>
                    <td>{ins.unidad}</td>
                    <td><strong>{ins.totalFinal}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="btn-submit-solicitud" style={{ background: data.color }}>
              Confirmar Registro de Pedido
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default NuevaSolicitud;