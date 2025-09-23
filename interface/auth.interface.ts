/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  image?: string;
  username?: string;
  data: any;
  user: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberPassword?: boolean;
}
export interface LoginResponse {
  data: string;
  message?: string;
}

export interface UserProfileResponse {
  user: User;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}
