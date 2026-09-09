import { describe, expect, it } from "vitest";
import { HttpError } from "@saas/shared/http-client";
import { shouldRetryAuthSession } from "./auth.queries";

describe("shouldRetryAuthSession", () => {
  it("does not retry unauthorized responses", () => {
    expect(shouldRetryAuthSession(0, new HttpError("غیرمجاز", 401, undefined))).toBe(false);
    expect(shouldRetryAuthSession(0, new HttpError("ممنوع", 403, undefined))).toBe(false);
  });

  it("retries a transient failure only once", () => {
    expect(shouldRetryAuthSession(0, new Error("network"))).toBe(true);
    expect(shouldRetryAuthSession(1, new Error("network"))).toBe(false);
  });
});
