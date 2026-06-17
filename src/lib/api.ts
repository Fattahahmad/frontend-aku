import { isAxiosError } from "axios";
import type { ApiError, ApiResponse } from "@moodmate/types/api";

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (response.status !== "success") {
    throw new Error(response.message || "Request failed");
  }

  return response.data;
}

export function getApiErrorMessage(error: unknown, fallback = "Terjadi kesalahan. Silakan coba lagi.") {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}
