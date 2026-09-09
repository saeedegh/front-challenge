import { afterEach, describe, expect, it, vi } from "vitest";
import { HttpError, httpClient } from "./http-client";

afterEach(() => vi.unstubAllGlobals());

describe("httpClient", () => {
  it("serializes JSON requests consistently", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "1" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      httpClient.post<{ id: string }, { name: string }>("/api/items", {
        name: "نمونه",
      }),
    ).resolves.toEqual({ id: "1" });

    const [, init] = fetchMock.mock.calls[0];
    expect(init).toMatchObject({ method: "POST", body: JSON.stringify({ name: "نمونه" }) });
    expect((init.headers as Headers).get("Content-Type")).toBe("application/json");
  });

  it("returns a status-aware error with the backend message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "دسترسی غیرمجاز است" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const request = httpClient.get("/api/private");
    await expect(request).rejects.toThrow("دسترسی غیرمجاز است");
    await expect(request).rejects.toMatchObject<HttpError>({ status: 401 });
  });
});
