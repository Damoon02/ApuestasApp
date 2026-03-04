import { useEffect, useState } from "react";
import { apiLocalMe } from "../apilocal/apilocalme";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await apiLocalMe();
        setMe(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  return (
    <div className="container grid">
      <div className="card">
        <div className="row-between">
          <div>
            <h2>Dashboard</h2>
            <p>Tu perfil (endpoint /me).</p>
          </div>
          {me && <span className="badge">{me.role}</span>}
        </div>

        <hr className="sep" />

        {err && <div className="toast err">{err}</div>}
        {!err && !me && <p>Cargando...</p>}

        {me && (
          <div className="grid">
            <div className="card" style={{ padding: 14 }}>
              <p><b>ID:</b> {me.id}</p>
              <p><b>Email:</b> {me.email}</p>
              <p><b>Role:</b> {me.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}