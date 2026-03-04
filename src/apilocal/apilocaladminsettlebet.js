import { httpJSON, getToken } from "./api.http";

/**
 * Liquida una apuesta (ADMIN)
 * POST /admin/bets/{id}/settle
 * Body: { result: "WON" | "LOST" }
 */
export function apiLocalAdminSettleBet(betId, result) {

  const token = getToken();

  return httpJSON(`/admin/bets/${betId}/settle`, {
    method: "POST",
    token: token,
    body: {
      result: result
    }
  });

}