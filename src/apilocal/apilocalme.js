import { httpJSON, getToken } from "./api.http";

/**
 * Obtiene la información del usuario autenticado
 * GET /me
 */
export function apiLocalMe() {

  const token = getToken();

  return httpJSON("/me", {
    method: "GET",
    token: token
  });

}