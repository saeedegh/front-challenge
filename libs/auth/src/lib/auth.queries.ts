"use client";

import { useQuery } from "@tanstack/react-query";
import { HttpError } from "@saas/shared/http-client";
import { authApi } from "./auth.api";
import { authKeys } from "./auth.keys";

export function isUnauthorizedError(error: unknown) {
  return error instanceof HttpError && (error.status === 401 || error.status === 403);
}

export function shouldRetryAuthSession(failureCount: number, error: unknown) {
  return !isUnauthorizedError(error) && failureCount < 1;
}

export function useAuthSessionQuery(token: string | null, isHydrated: boolean) {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: ({ signal }) => authApi.getMe(token as string, signal),
    enabled: isHydrated && Boolean(token),
    retry: shouldRetryAuthSession,
    staleTime: 60_000,
  });
}
