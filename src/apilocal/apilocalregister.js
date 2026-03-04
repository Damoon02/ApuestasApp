import { httpJSON } from "./api.http";

export function apiLocalRegister(email, password) {
  return httpJSON("/auth/register", {
    method: "POST",
    body: {
      email: email,
      password: password
    }
  });
}