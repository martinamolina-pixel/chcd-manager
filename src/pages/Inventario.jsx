import { useState } from "react";
import "../styles/inventario.css"; // Asegúrate de crear este CSS o adaptarlo

function Inventario() {
  // Estado para el buscador de insumos
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para filtrar solo lo que está crítico
  const [filterCritico, setFilterCritico] = useState(false);

  // Mock de datos reales de un inventario clínico
  const [insumos] = useState([
    { id: "INS-001", nombre: "Jeringas de 5cc", categoria: "Fungibles", stock: 150, stockMinimo: 50, ubicacion: "Estante A" },
    { id: "INS-002", nombre: "Guantes de Procedimiento (M)", categoria: "Protección", stock: 15, stockMinimo: 40, ubicacion: "Estante B" }, // Crítico
    { id: "INS-003", nombre: "Aguja Hipodérmica 21G", categoria: "Fungibles", stock: 8, stockMinimo: 30, ubicacion: "Estante A" },    // Crítico
    { id: "INS-004", nombre: "Suero Fisiológico 0.9% 250ml", categoria: "Soluciones", stock: 80, stockMinimo: 20, ubicacion: "Refrigerador 1" },
    { id: "INS-005", nombre: "Sonda Foley N°14", categoria: "Simulación Avanzada", stock: 5, stockMinimo: 10, ubicacion: "Estante C" }, // Crítico
  ]);

  // Lógica de filtrado combinado
  const insumosFiltrados = insumos.filter((insumo) => {
    const matchesSearch = insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          insumo.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCritico = filterCritico ? insumo.stock <= insumo.stockMinimo : true;
    return matchesSearch && matchesCritico;
  });

  return (
    <div className="inventario-page">
      <header className="page-header">
        <h1>Control de Inventario</h1>
        <p>Monitoreo de stock de materiales, insumos y recursos por carrera</p>
      </header>

      {/* Barra de Herramientas (Buscador + Filtros) */}
      <div className="toolbar">
        <input 
          type="text" 
          placeholder="🔍 Buscar por nombre o código de insumo..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <label className="filter-checkbox">
          <input 
            type="checkbox" 
            checked={filterCritico}
            onChange={(e) => setFilterCritico(e.target.checked)}
          />
          <span className="warning-text">⚠️ Mostrar solo Stock Crítico</span>
        </label>
      </div>

      {/* Tabla de Datos */}
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción del Insumo</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Stock Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {insumosFiltrados.length > 0 ? (
              insumosFiltrados.map((insumo) => {
                const esCritico = insumo.stock <= insumo.stockMinimo;
                return (
                  <tr key={insumo.id} className={esCritico ? "row-critical" : ""}>
                    <td><code>{insumo.id}</code></td>
                    <td><strong>{insumo.nombre}</strong></td>
                    <td><span className="category-badge">{insumo.categoria}</span></td>
                    <td>{insumo.ubicacion}</td>
                    <td>{insumo.stock} unidades</td>
                    <td>
                      <span className={`status-pill ${esCritico ? "danger" : "success"}`}>
                        {esCritico ? "Stock Crítico" : "Disponible"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="no-results">No se encontraron insumos bajo esos criterios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;