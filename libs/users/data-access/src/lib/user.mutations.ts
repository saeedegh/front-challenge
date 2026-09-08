"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserInput } from "@saas/users/domain";
import { userKeys } from "./user.keys";
import { usersApi } from "./users.api";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UserInput) => usersApi.update(id, input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: userKeys.detail(id) }),
      ]);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
}
