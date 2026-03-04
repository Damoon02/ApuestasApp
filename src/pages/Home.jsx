import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="container grid">
      <div className="card">
        <h1>ApuestasApp</h1>
        <p>
          Frontend conectado a tu API (Auth + Wallet + Bets). Aquí arrancas y vas a Dashboard
          cuando tengas sesión.
        </p>

        <hr className="sep" />

        <div className="row" style={{ flexWrap: "wrap" }}>
          {!token ? (
            <>
              <Link className="btn" to="/register">Crear cuenta</Link>
              <Link className="btn secondary" to="/login">Iniciar sesión</Link>
            </>
          ) : (
            <>
              <Link className="btn" to="/dashboard">Ir al Dashboard</Link>
              <Link className="btn secondary" to="/wallet">Ver Wallet</Link>
              <Link className="btn secondary" to="/bets">Ver Bets</Link>
            </>
          )}
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <h2>¿Qué incluye?</h2>
          <p>• Registro y Login con JWT</p>
          <p>• Wallet: saldo + movimientos + deposit/withdraw</p>
          <p>• Bets: crear y listar apuestas</p>
          <p>• Admin: settle (cuando tengas usuario ADMIN)</p>
        </div>

        <div className="card">
          <h2>Flujo</h2>
          <p>1) Sign Up</p>
          <p>2) Login (guarda token)</p>
          <p>3) Dashboard (/me)</p>
          <p>4) Wallet y Bets</p>
        </div>
      </div>
    </div>
  );
}