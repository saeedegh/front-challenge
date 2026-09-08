"use client";

import { useRouter } from "next/navigation";
import { authService } from "./auth.service";
import { useAuthStore } from "./auth.store";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return async function logout() {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      router.replace("/login");
    }
  };
}
