import { useState } from "react";
import "../styles/login.css";

const CREDENCIALES_REALES = {
  "admin@chcd.cl": { password: "admin2026", role: "admin", name: "Martina", carrera: "administracion", label: "Gerente de CHCD" },
  "enfermeria@chcd.cl": { password: "enfe2026", role: "encargada", name: "Coordinación Enfermería", carrera: "enfermeria", label: "Encargada Enfermería" },
  "medicina@chcd.cl": { password: "medi2026", role: "encargada", name: "Coordinación Medicina", carrera: "medicina", label: "Encargada Medicina" }
};

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cuenta = CREDENCIALES_REALES[email.toLowerCase().trim()];

    if (cuenta && cuenta.password === password) {
      onLoginSuccess(cuenta);
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>CHCD Manager</h2>
        <p>Control de Accesos por Unidad Académica</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="ejemplo@chcd.cl" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;