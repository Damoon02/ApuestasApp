import { useState } from "react";
import { apiLocalRegister } from "../apilocal/apilocalregister";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk(""); setErr(""); setLoading(true);
    try {
      const data = await apiLocalRegister(email, password);
      setOk(`Cuenta creada: ${data.email} (${data.role})`);
      setEmail(""); setPassword("");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container grid">
      <div className="card">
        <h2>Sign Up</h2>
        <p>Crea tu cuenta (mínimo 6 caracteres de password).</p>
        <hr className="sep" />

        <form className="grid" onSubmit={onSubmit}>
          <input className="input" type="email" placeholder="Email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

          <button className="btn" disabled={loading}>
            {loading ? "Creando..." : "Crear cuenta"}
          </button>

          {ok && <div className="toast ok">{ok}</div>}
          {err && <div className="toast err">{err}</div>}
        </form>
      </div>
    </div>
  );
}