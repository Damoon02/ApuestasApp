import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLocalLogin } from "../apilocal/apilocallogin";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await apiLocalLogin(email, password);
      nav("/dashboard");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container grid">
      <div className="card">
        <h2>Login</h2>
        <p>Inicia sesión para obtener tu JWT.</p>
        <hr className="sep" />

        <form className="grid" onSubmit={onSubmit}>
          <input className="input" type="email" placeholder="Email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {err && <div className="toast err">{err}</div>}
        </form>
      </div>
    </div>
  );
}