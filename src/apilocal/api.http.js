import { API_URL } from "./api.config";

/**
 * Request JSON genérico para tu API.
 * - Si mandas token, agrega Authorization: Bearer <token>
 * - Si el backend responde { error: "..." } en 400/401/403, lo lanza como Error()
 */
export async function httpJSON(path, { method = "GET", body, token } = {}) {
  const headers = { Accept: "application/json" };

  // Solo agregamos Content-Type cuando sí hay body (evita problemas con GET)
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Intentamos parsear JSON; si no hay, devolvemos {}
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Tu GlobalExceptionHandler manda { error: "..." }
    const message = data?.error || `HTTP ${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Helper: lee token guardado (si existe)
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Helper: guarda token
 */
export function setToken(token) {
  localStorage.setItem("token", token);
}

/**
 * Helper: borra token
 */
export function clearToken() {
  localStorage.removeItem("token");
}