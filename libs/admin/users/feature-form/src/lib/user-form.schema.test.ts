import { describe, expect, it } from "vitest";
import { userFormSchema } from "./user-form.schema";

describe("userFormSchema", () => {
  it("accepts a complete user", async () => {
    await expect(
      userFormSchema.validate({
        name: "سارا محمدی",
        email: "sara@example.com",
        department: "محصول",
        role: "user",
      }),
    ).resolves.toBeTruthy();
  });

  it("rejects invalid email and empty department", async () => {
    await expect(
      userFormSchema.validate(
        { name: "سارا", email: "invalid", department: "", role: "user" },
        { abortEarly: false },
      ),
    ).rejects.toMatchObject({
      errors: expect.arrayContaining(["یک ایمیل معتبر وارد کنید", "واحد سازمانی الزامی است"]),
    });
  });
});
