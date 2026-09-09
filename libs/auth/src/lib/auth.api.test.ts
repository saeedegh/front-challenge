import { afterEach, describe, expect, it, vi } from "vitest";
import { authApi } from "./auth.api";

afterEach(() => vi.unstubAllGlobals());

describe("authApi", () => {
  it("sends login credentials through the shared HTTP client", async () => {
    const responseBody = {
      user: {
        id: "1",
        name: "علی رضایی",
        email: "admin@saas.io",
        role: "admin" as const,
        department: "فناوری اطلاعات",
        createdAt: "2024-01-01T00:00:00Z",
      },
      token: "token",
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const credentials = { email: "admin@saas.io", password: "admin123" };
    await expect(authApi.login(credentials)).resolves.toEqual(responseBody);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({ method: "POST", body: JSON.stringify(credentials) }),
    );
  });

  it("sends the session token and forwards request cancellation", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: "1",
          name: "علی رضایی",
          email: "admin@saas.io",
          role: "admin",
          department: "فناوری اطلاعات",
          createdAt: "2024-01-01T00:00:00Z",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();

    await authApi.getMe("token", controller.signal);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.signal).toBe(controller.signal);
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer token");
  });
});
