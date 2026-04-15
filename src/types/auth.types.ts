export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  success: boolean;
  message: string;
  userId: number;
  role: string;
  name: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  position?: string;
  semester?: number;
}

export interface RegisterResponse {
  userId: number;
  email: string;
  role: string;
  message: string;
}

export interface User {
  userId: number;
  email: string;
  role: string;
  name: string;
  token: string;
}