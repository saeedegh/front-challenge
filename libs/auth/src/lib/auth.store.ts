"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "./auth.types";
type Store = AuthState & {
  setAuth: (u: User, t: string) => void;
  clearAuth: () => void;
  setHydrated: (value: boolean) => void;
};
export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: "saas-auth",
      partialize: ({ user, token }) => ({ user, token }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
