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
  authToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string;
  logout: boolean;
  moduleTitle: string;
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

export interface ForgotPasswordRequest {
  email: string;
  success?: boolean;
}

export interface VerifyOTPRequest {
  otp: number;
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  authToken?: string | null;
}

export interface LoginResponse {
  data: string;
  message?: string;
  success?: boolean;
  role: string;
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

export interface ForgotPasswordResponse {
  success: boolean;
  data?: string;
  message?: string;
}
export interface ResetPasswordResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  data?: string;
  message?: string;
}
