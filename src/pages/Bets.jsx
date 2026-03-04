import { useEffect, useState } from "react";
import { apiLocalBetsCreate } from "../apilocal/apilocalbetscreate";
import { apiLocalBetsList } from "../apilocal/apilocalbetslist";

export default function Bets() {
  const [stake, setStake] = useState("50.00");
  const [odds, setOdds] = useState("1.85");
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const load = async () => {
    setErr(""); setOk("");
    const data = await apiLocalBetsList();
    setBets(data);
  };

  useEffect(() => { load().catch(e => setErr(e.message)); }, []);

  const create = async () => {
    setLoading(true); setErr(""); setOk("");
    try {
      await apiLocalBetsCreate(stake, odds);
      setOk("Apuesta creada.");
      await load();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container grid">
      <div className="card">
        <div className="row-between">
          <div>
            <h2>Bets</h2>
            <p>Crea y revisa tus apuestas.</p>
          </div>
          <span className="badge">/bets</span>
        </div>

        <hr className="sep" />

        {err && <div className="toast err">{err}</div>}
        {ok && <div className="toast ok">{ok}</div>}

        <div className="grid2">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Crear apuesta</h3>
            <input className="input" value={stake} onChange={(e) => setStake(e.target.value)} placeholder="stake" />
            <div style={{ height: 10 }} />
            <input className="input" value={odds} onChange={(e) => setOdds(e.target.value)} placeholder="odds" />

            <div style={{ height: 12 }} />
            <button className="btn" onClick={create} disabled={loading}>
              {loading ? "Creando..." : "Apostar"}
            </button>

            <p style={{ marginTop: 10 }}>
              Reglas: stake ≥ 0.01, odds ≥ 1.01.
            </p>
          </div>

          <div className="card">
            <div className="row-between">
              <h3 style={{ marginTop: 0 }}>Historial</h3>
              <button className="btn secondary" onClick={() => load()} disabled={loading}>
                Refrescar
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Stake</th>
                  <th>Odds</th>
                  <th>Payout</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {bets.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.status}</td>
                    <td>{b.stake}</td>
                    <td>{b.odds}</td>
                    <td>{b.potentialPayout}</td>
                    <td>{b.createdAt}</td>
                  </tr>
                ))}
                {bets.length === 0 && (
                  <tr><td colSpan="6" style={{ color: "var(--muted)" }}>No hay apuestas aún.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}