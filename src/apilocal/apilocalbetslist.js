import { httpJSON, getToken } from "./api.http";

/**
 * GET /bets
 * Resp: List<BetResponse>
 */
export function apiLocalBetsList() {
  const token = getToken();

  return httpJSON("/bets", {
    method: "GET",
    token,
  });
}