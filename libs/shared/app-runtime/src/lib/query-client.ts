import { QueryClient } from "@tanstack/react-query";
import { HttpError } from "@saas/shared/http-client";

export function shouldRetryQuery(failureCount: number, error: unknown) {
  if (error instanceof HttpError && error.status >= 400 && error.status < 500) {
    return false;
  }

  return failureCount < 1;
}

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetryQuery,
        staleTime: 30_000,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
