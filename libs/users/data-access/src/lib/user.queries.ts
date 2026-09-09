"use client";

import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./user.keys";
import { usersApi } from "./users.api";

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: ({ signal }) => usersApi.getAll(signal),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: ({ signal }) => usersApi.getById(id, signal),
    enabled: Boolean(id),
  });
}
