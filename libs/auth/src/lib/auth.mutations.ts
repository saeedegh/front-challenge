"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import { authKeys } from "./auth.keys";
import { useAuthStore } from "./auth.store";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: authApi.login,
    onMutate: () => queryClient.cancelQueries(),
    onSuccess: (response) => {
      queryClient.removeQueries();
      queryClient.setQueryData(authKeys.session(), response.user);
      setAuth(response.user, response.token);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationKey: authKeys.logout(),
    mutationFn: authApi.logout,
    onMutate: () => queryClient.cancelQueries(),
    onSettled: () => {
      clearAuth();
      queryClient.removeQueries();
    },
  });
}
