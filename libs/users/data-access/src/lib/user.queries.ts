"use client";

import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./user.keys";
import { usersApi } from "./users.api";

export function useUsers() {
  return useQuery({ queryKey: userKeys.list(), queryFn: usersApi.getAll });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
  });
}
