const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const tokenStore = {
  get: () => localStorage.getItem("token"),
  set: (t) => localStorage.setItem("token", t),
  clear: () => localStorage.removeItem("token"),
};

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// Auth
export const api = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/me"),

  wallet: () => request("/wallet"),
  deposit: (amount) =>
    request("/wallet/deposit", { method: "POST", body: { amount } }),
  withdraw: (amount) =>
    request("/wallet/withdraw", { method: "POST", body: { amount } }),

  bets: () => request("/bets"),
  createBet: (stake, odds) =>
    request("/bets", { method: "POST", body: { stake, odds } }),

  // opcional admin
  settleBet: (id, result) =>
    request(`/admin/bets/${id}/settle`, { method: "POST", body: { result } }),
};