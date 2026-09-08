import type { User } from "../../../auth/src";

export type UserInput = Pick<User, "name" | "email" | "role" | "department">;

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(body.message ?? "انجام درخواست با خطا مواجه شد");
  }
  return body;
}

export const usersApi = {
  async getAll() {
    const response = await fetch("/api/users");
    return readResponse<User[]>(response);
  },

  async getById(id: string) {
    const response = await fetch(`/api/users/${id}`);
    return readResponse<User>(response);
  },

  async create(input: UserInput) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return readResponse<User>(response);
  },

  async update(id: string, input: UserInput) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return readResponse<User>(response);
  },

  async delete(id: string) {
    const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
    return readResponse<{ id: string }>(response);
  },
};
