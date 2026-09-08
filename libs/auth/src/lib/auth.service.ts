import type { LoginCredentials, AuthResponse, User } from './auth.types';

async function readJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error('The authentication service returned an invalid response.');
  }
  return response.json() as Promise<T>;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const body = await readJson<AuthResponse & { message?: string }>(response);
    if (!response.ok) throw new Error(body.message ?? 'Login failed');
    return body;
  },
  async logout() {},
  async getMe(token: string) {
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw Error('Unauthorized');
    return readJson<User>(response);
  },
};
