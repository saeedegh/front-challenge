"use client";

import { useAuthSessionContext } from "./auth-session-context";
import { useAuthStore } from "./auth.store";

export function useAuth() {
  const authState = useAuthStore();
  const sessionState = useAuthSessionContext();

  return { ...authState, ...sessionState };
}
