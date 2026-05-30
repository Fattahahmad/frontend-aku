import apiClient from './client';
import { ApiResponse } from '../types/api';

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  current_streak?: number;
  last_checkin_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfileResponse {
  user: UserData;
}

export const getUserProfile = async () => {
  const response = await apiClient.get<ApiResponse<UserProfileResponse>>('/users/me');
  return response.data;
};

export const updateUserProfile = async (formData: FormData) => {
  const response = await apiClient.put<ApiResponse<UserProfileResponse>>('/users/me', formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post<ApiResponse<null>>('/users/logout');
  return response.data;
};