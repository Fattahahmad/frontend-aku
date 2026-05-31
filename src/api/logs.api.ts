import apiClient from './client';
import { ApiResponse } from '../types/api';

export interface SummaryData {
  user_name: string;
  total_checkins: number;
  average_mood_score: number;
  average_mood_label: string;
  current_streak: number;
  recent_insight?: string;
}

export interface CalendarLog {
  log_date: string;
  mood_score: number;
}

export interface CalendarData {
  logs: CalendarLog[];
}

export interface LogDetail {
  id: string;
  user_id: string;
  mood_score: number;
  journal_text: string;
  emotion_label: string | null;
  created_at: string;
  updated_at: string;
}

export interface LogDetailResponse {
  log: LogDetail;
}

export interface CreateLogPayload {
  mood_score: number;
  journal_text: string;
}

export interface CreateLogResponse {
  log: LogDetail;
  suggestion?: string;
  streak?: number;
}

export const getSummary = async () => {
  const response = await apiClient.get<ApiResponse<SummaryData>>('/dashboard/summary');
  return response.data;
};

export const getCalendar = async (month: number, year: number) => {
  const response = await apiClient.get<ApiResponse<CalendarData>>(`/logs/calendar?month=${month}&year=${year}`);
  return response.data;
};

export const getLogByDate = async (date: string) => {
  const response = await apiClient.get<ApiResponse<LogDetailResponse>>(`/logs/date/${date}`);
  return response.data;
};

export const createLog = async (payload: CreateLogPayload) => {
  const response = await apiClient.post<ApiResponse<CreateLogResponse>>('/logs', payload);
  return response.data;
};

export const updateLog = async (id: string, payload: CreateLogPayload) => {
  const response = await apiClient.put<ApiResponse<LogDetailResponse>>(`/logs/${id}`, payload);
  return response.data;
};

export const deleteLog = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<null>>(`/logs/${id}`);
  return response.data;
};

export const getAllLogs = async (page: number = 1, limit: number = 10) => {
  const response = await apiClient.get<ApiResponse<PaginatedLogsResponse>>(`/logs?page=${page}&limit=${limit}`);
  return response.data;
};

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

export const getSuggestion = async (moodScore: number, journalText: string) => {
  const response = await apiClient.post<ApiResponse<SuggestionResponse>>(
    '/logs/suggestion',
    { mood_score: moodScore, journal_text: journalText }
  );
  return response.data;
};
