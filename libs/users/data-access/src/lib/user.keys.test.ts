import { describe, expect, it } from "vitest";
import { userKeys } from "./user.keys";

describe("userKeys", () => {
  it("creates stable list and detail keys", () => {
    expect(userKeys.list()).toEqual(["users", "list"]);
    expect(userKeys.detail("42")).toEqual(["users", "detail", "42"]);
  });
});
