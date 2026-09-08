import type { User } from "@saas/users/domain";

export type { User } from "@saas/users/domain";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface AuthResponse {
  user: User;
  token: string;
}
