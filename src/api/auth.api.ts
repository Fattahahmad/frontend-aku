import apiClient from "./client";
import { unwrapApiResponse } from "@moodmate/lib/api";
import { ApiResponse } from "@moodmate/types/api";
import { User } from "@moodmate/types/models";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const registerFn = async (payload: RegisterPayload) => {
  const response = await apiClient.post<ApiResponse<RegisterResponse>>("/auth/register", payload);
  return unwrapApiResponse(response.data);
};

export const loginFn = async (payload: LoginPayload) => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  return unwrapApiResponse(response.data);
};
