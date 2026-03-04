import { httpJSON, setToken } from "./api.http";

/**
 * Login:
 * POST /auth/login
 * body: { email, password }
 * resp: { id, email, role, token }
 */
export async function apiLocalLogin(email, password) {
  const data = await httpJSON("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  // ✅ guardar token para futuras consultas protegidas (/me, /wallet, /bets)
  if (data?.token) {
    setToken(data.token);
  }

  // (opcional) guardar info del usuario por comodidad
  localStorage.setItem(
    "user",
    JSON.stringify({ id: data.id, email: data.email, role: data.role })
  );

  return data;
}