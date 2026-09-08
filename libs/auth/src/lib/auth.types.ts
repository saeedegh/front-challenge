export interface User { id:string; name:string; email:string; role:'admin'|'user'; avatar?:string; department?:string; createdAt:string; }
export interface AuthState { user:User|null; token:string|null; isAuthenticated:boolean; isLoading:boolean; }
export interface LoginCredentials { email:string; password:string; }
export interface AuthResponse { user:User; token:string; }
