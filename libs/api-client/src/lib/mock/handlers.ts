import { http, HttpResponse } from "msw";
import type { User } from "../../../../auth/src";
import type { UserInput } from "../users.api";
import { MOCK_USERS, MOCK_CREDENTIALS, MOCK_TOKEN } from "./data";

function emailExists(email: string, ignoredId?: string) {
  return MOCK_USERS.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() && user.id !== ignoredId,
  );
}

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const credentials = MOCK_CREDENTIALS.find(
      (item) => item.email === body.email && item.password === body.password,
    );
    if (!credentials) {
      return HttpResponse.json(
        { message: "ایمیل یا رمز عبور نادرست است" },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      user: MOCK_USERS.find((user) => user.id === credentials.userId),
      token: MOCK_TOKEN,
    });
  }),

  http.get("/api/users", () => HttpResponse.json(MOCK_USERS)),

  http.get("/api/users/:id", ({ params }) => {
    const user = MOCK_USERS.find((item) => item.id === params.id);
    return user
      ? HttpResponse.json(user)
      : HttpResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
  }),

  http.post("/api/users", async ({ request }) => {
    const input = (await request.json()) as UserInput;
    if (emailExists(input.email)) {
      return HttpResponse.json(
        { message: "کاربری با این ایمیل وجود دارد" },
        { status: 409 },
      );
    }
    const user: User = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    MOCK_USERS.push(user);
    return HttpResponse.json(user, { status: 201 });
  }),

  http.put("/api/users/:id", async ({ params, request }) => {
    const index = MOCK_USERS.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }
    const input = (await request.json()) as UserInput;
    if (emailExists(input.email, String(params.id))) {
      return HttpResponse.json(
        { message: "کاربری با این ایمیل وجود دارد" },
        { status: 409 },
      );
    }
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...input };
    return HttpResponse.json(MOCK_USERS[index]);
  }),

  http.delete("/api/users/:id", ({ params }) => {
    const index = MOCK_USERS.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }
    const [deletedUser] = MOCK_USERS.splice(index, 1);
    return HttpResponse.json({ id: deletedUser.id });
  }),

  http.get("/api/auth/me", () => HttpResponse.json(MOCK_USERS[0])),
];
