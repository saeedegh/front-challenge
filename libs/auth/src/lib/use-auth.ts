"use client";
import { useAuthStore } from "./auth.store";
import { authService } from "./auth.service";
import type { LoginCredentials } from "./auth.types";
export function useAuth() {
  const s = useAuthStore();
  const login = async (c: LoginCredentials) => {
    s.setLoading(true);
    try {
      const r = await authService.login(c);
      s.setAuth(r.user, r.token);
      return { success: true as const };
    } catch (e) {
      s.setLoading(false);
      return { success: false as const, error: (e as Error).message };
    }
  };
  return {
    ...s,
    login,
    logout: async () => {
      await authService.logout();
      s.clearAuth();
    },
  };
}
