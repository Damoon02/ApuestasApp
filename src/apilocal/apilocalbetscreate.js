import { httpJSON, getToken } from "./api.http";

/**
 * POST /bets
 * Body: { stake, odds }
 * Resp: BetResponse
 */
export function apiLocalBetsCreate(stake, odds) {
  const token = getToken();

  return httpJSON("/bets", {
    method: "POST",
    token,
    body: { stake, odds },
  });
}