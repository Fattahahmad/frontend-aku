import apiClient from "./client";
import { unwrapApiResponse } from "@moodmate/lib/api";
import { ApiResponse } from "@moodmate/types/api";

export interface RecentEmotion {
  emotion: string;
  intensity: number;
  created_at: string;
}

export interface SummaryData {
  total_checkins: number;
  average_intensity: string;
  recent_emotions: RecentEmotion[];
  ai_insight: string;
  user_name?: string;
  current_streak?: number;
}

export interface CalendarLog {
  log_date: string;
  emotion: string;
  intensity: number;
  journal_text?: string;
}

export interface CalendarData {
  logs: CalendarLog[];
}

export interface LogDetail {
  id: string;
  user_id?: string;
  emotion: string;
  intensity: number;
  journal_text: string;
  created_at: string;
  updated_at?: string;
}

export interface TodayLogData {
  has_checked_in: boolean;
  log_data: LogDetail | null;
}

export interface LogDetailResponse {
  log: LogDetail | null;
}

export interface CreateLogPayload {
  emotion: string;
  intensity: number;
  journal_text: string;
}

export interface CreateLogResponse {
  log: LogDetail;
  suggestion?: string;
  streak?: number;
}

export interface PaginatedLogsResponse {
  logs: LogDetail[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}

export interface SuggestionResponse {
  suggestion: string;
}

export const getSummary = async () => {
  const response = await apiClient.get<ApiResponse<SummaryData>>("/dashboard/summary");
  return unwrapApiResponse(response.data);
};

export const getTodayLog = async () => {
  const response = await apiClient.get<ApiResponse<TodayLogData>>("/logs/today");
  return unwrapApiResponse(response.data);
};

export const getCalendar = async (month: number, year: number) => {
  const response = await apiClient.get<ApiResponse<CalendarData>>("/logs/calendar", {
    params: { month, year },
  });
  return unwrapApiResponse(response.data);
};

export const getLogByDate = async (date: string) => {
  const response = await apiClient.get<ApiResponse<LogDetailResponse>>(`/logs/date/${encodeURIComponent(date)}`);
  return unwrapApiResponse(response.data);
};

export const createLog = async (payload: CreateLogPayload) => {
  const response = await apiClient.post<ApiResponse<CreateLogResponse>>("/logs", payload);
  return unwrapApiResponse(response.data);
};

export const updateLog = async (id: string, payload: CreateLogPayload) => {
  const response = await apiClient.put<ApiResponse<LogDetailResponse>>(`/logs/${encodeURIComponent(id)}`, payload);
  return unwrapApiResponse(response.data);
};

export const deleteLog = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<null>>(`/logs/${encodeURIComponent(id)}`);
  return unwrapApiResponse(response.data);
};

export const getAllLogs = async (page = 1, limit = 10) => {
  const response = await apiClient.get<ApiResponse<PaginatedLogsResponse>>("/logs", {
    params: { page, limit },
  });
  return unwrapApiResponse(response.data);
};

export const getSuggestion = async (emotion: string, intensity: number, journalText: string) => {
  const response = await apiClient.post<ApiResponse<SuggestionResponse>>("/logs/suggestion", {
    emotion,
    intensity,
    journal_text: journalText,
  });
  return unwrapApiResponse(response.data);
};
