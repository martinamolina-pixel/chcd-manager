import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>CHCD Manager</h1>
        <p>
          Sistema de gestión de insumos para campos clínicos
        </p>
      </header>

      <main className="dashboard">

        <section className="card">
          <h2>Solicitudes de Insumos</h2>
          <p>
            Crear y gestionar requerimientos de materiales
            para prácticas clínicas e internados.
          </p>
          <button>
            Nueva Solicitud
          </button>
        </section>


        <section className="card">
          <h2>Administración</h2>
          <p>
            Gestión de pedidos, estados y preparación
            de paquetes.
          </p>
          <button>
            Ingresar
          </button>
        </section>


        <section className="card">
          <h2>Inventario</h2>
          <p>
            Control de movimientos y descuentos
            asociados a cada carrera.
          </p>
          <button>
            Ver Inventario
          </button>
        </section>

      </main>
    </div>
  )
}

export default App