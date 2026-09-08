"use client";
import { useEffect } from "react";
import { useAuthStore } from "./auth.store";
import { authService } from "./auth.service";
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, isHydrated, setAuth, clearAuth, setLoading } = useAuthStore();
  useEffect(() => {
    if (!isHydrated) return;
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    authService
      .getMe(token)
      .then((user) => setAuth(user, token))
      .catch(clearAuth);
  }, [token, isHydrated, setAuth, clearAuth, setLoading]);
  return <>{children}</>;
}
