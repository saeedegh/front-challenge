import { afterEach, describe, expect, it, vi } from "vitest";
import { usersApi } from "./users.api";

afterEach(() => vi.unstubAllGlobals());

describe("usersApi", () => {
  it("sends update data to the user endpoint", async () => {
    const input = {
      name: "علی رضایی",
      email: "ali@example.com",
      role: "user" as const,
      department: "محصول",
    };
    const responseBody = { ...input, id: "1", createdAt: "2024-01-01T00:00:00Z" };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(usersApi.update("1", input)).resolves.toEqual(responseBody);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/users/1",
      expect.objectContaining({ method: "PUT", body: JSON.stringify(input) }),
    );
  });

  it("surfaces the backend error message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "کاربر پیدا نشد" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    await expect(usersApi.getById("missing")).rejects.toThrow("کاربر پیدا نشد");
  });
});
