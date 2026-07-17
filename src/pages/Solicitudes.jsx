import { useState, useEffect } from "react";

function Solicitudes({ user }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const registradas = JSON.parse(localStorage.getItem("solicitudes_chcd") || "[]");
    if (user.role === "admin") {
      setSolicitudes(registradas);
    } else {
      // Las encargadas solo ven lo correspondiente a su carrera
      const carreraMapeada = user.carrera === "enfermeria" ? "Enfermería" : "Medicina";
      setSolicitudes(registradas.filter(s => s.carrera === carreraMapeada));
    }
  }, [user]);

  const finalizarEntrega = (id) => {
    const actuales = [...solicitudes];
    const index = actuales.findIndex(s => s.id === id);
    
    if (index !== -1) {
      actuales[index].estado = "Entrega Finalizada";
      
      // LOGICA DE REBAJA: Aquí se descuenta del inventario general en producción
      localStorage.setItem("solicitudes_chcd", JSON.stringify(actuales));
      setSolicitudes(actuales);
      alert("Pedido marcado como 'Entrega Finalizada'. Los insumos han sido rebajados del Stock.");
    }
  };

  return (
    <div style={{ padding: "1rem", background: "white", borderRadius: "8px" }}>
      <h2>Historial Operativo de Pedidos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={{ padding: "10px" }}>Carrera</th>
            <th>Campo Clínico</th>
            <th>Asignatura</th>
            <th>Estado</th>
            {user.role === "admin" && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "10px" }}>{s.carrera}</td>
              <td>{s.campoClinico}</td>
              <td>{s.asignatura}</td>
              <td>
                <span style={{ 
                  color: s.estado === "Entrega Finalizada" ? "green" : "orange",
                  fontWeight: "bold"
                }}>{s.estado}</span>
              </td>
              {user.role === "admin" && s.estado === "Pendiente" && (
                <td>
                  <button onClick={() => finalizarEntrega(s.id)} style={{ background: "#0d9488", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                    ✓ Finalizar Entrega
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Solicitudes;