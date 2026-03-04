import { httpJSON, getToken } from "./api.http";

/**
 * POST /wallet/deposit
 * Body: { amount }
 * amount: BigDecimal (manda número o string, ej "100.00")
 */
export function apiLocalWalletDeposit(amount) {
  const token = getToken();

  return httpJSON("/wallet/deposit", {
    method: "POST",
    token,
    body: { amount },
  });
}