import { httpClient } from "@saas/shared/http-client";
import type { AuthResponse, LoginCredentials, User } from "./auth.types";

export const authApi = {
  login(credentials: LoginCredentials) {
    return httpClient.post<AuthResponse, LoginCredentials>("/api/auth/login", credentials);
  },
  getMe(token: string, signal?: AbortSignal) {
    return httpClient.get<User>("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
  },
  async logout() {
    // The current backend contract has no logout endpoint. Keeping this async
    // command here lets the mutation own the workflow when one is introduced.
  },
};
