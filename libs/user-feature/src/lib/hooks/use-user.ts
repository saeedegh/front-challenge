"use client";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../../../api-client/src";
export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}
