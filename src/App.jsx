import { useEffect } from "react";
import { api, tokenStore } from "./api";

export default function App() {
  useEffect(() => {
    async function run() {
      try {
        // 1) Login (solo para probar; luego lo quitas)
        const loginRes = await api.login("luna@test.com", "12345678");
        tokenStore.set(loginRes.token);
        console.log("LOGIN OK:", loginRes);

        // 2) Me (protegido)
        const me = await api.me();
        console.log("/me OK:", me);

        // 3) Wallet
        const w = await api.wallet();
        console.log("/wallet OK:", w);

        // 4) Bets
        const b = await api.bets();
        console.log("/bets OK:", b);
      } catch (e) {
        console.error("API ERROR:", e.message);
      }
    }
    run();
  }, []);

  return <div>Conexión Front ↔ Back lista (revisa la consola)</div>;
}