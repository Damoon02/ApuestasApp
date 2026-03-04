import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="nav">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/">ApuestasApp</Link>
          <span className="pill">API Local</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          {!token && <Link to="/register">Sign Up</Link>}
          {!token && <Link to="/login">Login</Link>}

          {token && <Link to="/dashboard">Dashboard</Link>}
          {token && <Link to="/wallet">Wallet</Link>}
          {token && <Link to="/bets">Bets</Link>}

          {token && (
            <button className="btn secondary" onClick={logout}>
              Logout
            </button>
          )}
          {token && user && <span className="badge">{user.email}</span>}
        </div>
      </div>
    </div>
  );
}