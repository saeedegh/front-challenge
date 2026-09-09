"use client";

import { createContext, useContext } from "react";

interface AuthSessionContextValue {
  isSessionLoading: boolean;
  isSessionRetrying: boolean;
  sessionError: Error | null;
  retrySession: () => Promise<unknown>;
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export const AuthSessionContextProvider = AuthSessionContext.Provider;

export function useAuthSessionContext() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }

  return context;
}
