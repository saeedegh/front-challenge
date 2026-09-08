import type { User } from "../../../../auth/src";
export const MOCK_TOKEN = "mock-jwt-token-saas-platform";
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "علی رضایی",
    email: "admin@saas.io",
    role: "admin",
    department: "فناوری اطلاعات",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "2",
    name: "سارا محمدی",
    email: "user@saas.io",
    role: "user",
    department: "محصول",
    createdAt: "2024-02-14T10:30:00Z",
  },
];
export const MOCK_CREDENTIALS = [
  { email: "admin@saas.io", password: "admin123", userId: "1" },
  { email: "user@saas.io", password: "user123", userId: "2" },
];
