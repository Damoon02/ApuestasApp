import { httpJSON, getToken } from "./api.http";

/**
 * POST /wallet/withdraw
 * Body: { amount }
 */
export function apiLocalWalletWithdraw(amount) {
  const token = getToken();

  return httpJSON("/wallet/withdraw", {
    method: "POST",
    token,
    body: { amount },
  });
}