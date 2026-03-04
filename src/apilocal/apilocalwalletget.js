import { httpJSON, getToken } from "./api.http";

/**
 * GET /wallet
 * Resp: { balance, lastMovements: [...] }
 */
export function apiLocalWalletGet() {
  const token = getToken();

  return httpJSON("/wallet", {
    method: "GET",
    token,
  });
}