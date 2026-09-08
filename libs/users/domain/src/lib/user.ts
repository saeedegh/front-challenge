export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  createdAt: string;
}

export type UserInput = Pick<User, "name" | "email" | "role" | "department">;

export interface DashboardSummary {
  totalUsers: number;
  adminUsers: number;
}
