import type { User, UserInput } from "@saas/users/domain";

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(body.message ?? "انجام درخواست با خطا مواجه شد");
  }
  return body;
}

export const usersApi = {
  async getAll() {
    return readResponse<User[]>(await fetch("/api/users"));
  },
  async getById(id: string) {
    return readResponse<User>(await fetch(`/api/users/${id}`));
  },
  async create(input: UserInput) {
    return readResponse<User>(
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    );
  },
  async update(id: string, input: UserInput) {
    return readResponse<User>(
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    );
  },
  async delete(id: string) {
    return readResponse<{ id: string }>(await fetch(`/api/users/${id}`, { method: "DELETE" }));
  },
};
