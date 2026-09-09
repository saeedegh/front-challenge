"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthSessionContextProvider } from "./auth-session-context";
import { isUnauthorizedError, useAuthSessionQuery } from "./auth.queries";
import { useAuthStore } from "./auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const sessionQuery = useAuthSessionQuery(token, isHydrated);
  const unauthorized = isUnauthorizedError(sessionQuery.error);

  useEffect(() => {
    if (token && sessionQuery.data) {
      setAuth(sessionQuery.data, token);
    }
  }, [sessionQuery.data, setAuth, token]);

  useEffect(() => {
    if (!unauthorized) return;

    clearAuth();
    queryClient.removeQueries();
  }, [clearAuth, queryClient, unauthorized]);

  const sessionError: Error | null =
    !sessionQuery.data && sessionQuery.error instanceof Error && !unauthorized
      ? sessionQuery.error
      : null;
  const isSessionLoading =
    !isHydrated || (Boolean(token) && (sessionQuery.isLoading || unauthorized));

  return (
    <AuthSessionContextProvider
      value={{
        isSessionLoading,
        isSessionRetrying: sessionQuery.isFetching,
        sessionError,
        retrySession: async () => {
          await sessionQuery.refetch();
        },
      }}
    >
      {children}
    </AuthSessionContextProvider>
  );
}
