import { useEffect, useState } from "react";
import { apiLocalWalletGet } from "../apilocal/apilocalwalletget";
import { apiLocalWalletDeposit } from "../apilocal/apilocalwalletdeposit";
import { apiLocalWalletWithdraw } from "../apilocal/apilocalwalletwithdraw";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("100.00");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const load = async () => {
    setErr(""); setOk("");
    const data = await apiLocalWalletGet();
    setWallet(data);
  };

  useEffect(() => { load().catch(e => setErr(e.message)); }, []);

  const deposit = async () => {
    setLoading(true); setErr(""); setOk("");
    try {
      const data = await apiLocalWalletDeposit(amount);
      setWallet(data);
      setOk("Depósito realizado.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    setLoading(true); setErr(""); setOk("");
    try {
      const data = await apiLocalWalletWithdraw(amount);
      setWallet(data);
      setOk("Retiro realizado.");
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
            <h2>Wallet</h2>
            <p>Saldo y últimos movimientos.</p>
          </div>
          <span className="badge">/wallet</span>
        </div>

        <hr className="sep" />

        {!wallet && !err && <p>Cargando...</p>}
        {err && <div className="toast err">{err}</div>}
        {ok && <div className="toast ok">{ok}</div>}

        {wallet && (
          <>
            <div className="card" style={{ padding: 14, marginBottom: 14 }}>
              <div className="row-between">
                <p><b>Balance:</b> ${wallet.balance}</p>
                <button className="btn secondary" onClick={() => load()} disabled={loading}>
                  Refrescar
                </button>
              </div>
            </div>

            <div className="grid2">
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Acciones</h3>
                <input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="row">
                  <button className="btn green" onClick={deposit} disabled={loading}>
                    Depositar
                  </button>
                  <button className="btn danger" onClick={withdraw} disabled={loading}>
                    Retirar
                  </button>
                </div>
                <p style={{ marginTop: 10 }}>
                  Monto mínimo: 0.01 (según tu DTO).
                </p>
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>Movimientos</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(wallet.lastMovements || []).map(m => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.type}</td>
                        <td>{m.amount}</td>
                        <td>{m.createdAt}</td>
                      </tr>
                    ))}
                    {(!wallet.lastMovements || wallet.lastMovements.length === 0) && (
                      <tr><td colSpan="4" style={{ color: "var(--muted)" }}>Sin movimientos.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}