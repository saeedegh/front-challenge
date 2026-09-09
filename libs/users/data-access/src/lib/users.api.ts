import { httpClient } from "@saas/shared/http-client";
import type { User, UserInput } from "@saas/users/domain";

export const usersApi = {
  getAll(signal?: AbortSignal) {
    return httpClient.get<User[]>("/api/users", { signal });
  },
  getById(id: string, signal?: AbortSignal) {
    return httpClient.get<User>(`/api/users/${id}`, { signal });
  },
  create(input: UserInput) {
    return httpClient.post<User, UserInput>("/api/users", input);
  },
  update(id: string, input: UserInput) {
    return httpClient.put<User, UserInput>(`/api/users/${id}`, input);
  },
  delete(id: string) {
    return httpClient.delete<{ id: string }>(`/api/users/${id}`);
  },
};
