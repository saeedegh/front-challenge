"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "./auth.types";
type Store = AuthState & {
  setAuth: (u: User, t: string) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
};
export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true, isLoading: false }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "saas-auth" },
  ),
);
