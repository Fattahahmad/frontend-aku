import apiClient from "./client";
import { unwrapApiResponse } from "@moodmate/lib/api";
import { ApiResponse } from "@moodmate/types/api";

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  created_at: string;
  updated_at: string;
  total_completions?: number;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  note: string | null;
  created_at: string;
}

export interface CreateHabitPayload {
  title: string;
  description?: string | null;
  targetDate?: string | null;
}

export interface UpdateHabitPayload {
  title?: string;
  description?: string | null;
  targetDate?: string | null;
}

export interface CompleteHabitPayload {
  date: string;
  note?: string | null;
}

export interface HabitSummary {
  activeHabits: number;
  totalCompleted: number;
  completionRate: number;
  bestStreak: {
    habitId: string;
    title: string;
    streak: number;
  } | null;
  dailyCompletions: {
    date: string;
    count: number;
  }[];
}

export interface HabitInsight {
  habitId: string;
  title: string;
  completedDays: number;
  streak: number;
  completionRate: number;
}

export interface ListHabitsResponse {
  habits: Habit[];
}

export interface HabitResponse {
  habit: Habit;
}

export interface CompleteHabitResponse {
  completion: HabitCompletion;
  streak: number;
}

export interface DeleteCompletionResponse {
  streak: number;
}

export interface HabitCompletionsResponse {
  completions: HabitCompletion[];
}

export interface HabitSummaryResponse {
  activeHabits: number;
  totalCompleted: number;
  completionRate: number;
  bestStreak: {
    habitId: string;
    title: string;
    streak: number;
  } | null;
  dailyCompletions: {
    date: string;
    count: number;
  }[];
}

export interface HabitInsightsResponse {
  insights: HabitInsight[];
}

const rangeParams = (from: string, to: string) => ({ from, to });

export const getHabits = async () => {
  const response = await apiClient.get<ApiResponse<ListHabitsResponse>>("/habits");
  return unwrapApiResponse(response.data).habits;
};

export const createHabit = async (payload: CreateHabitPayload) => {
  const response = await apiClient.post<ApiResponse<HabitResponse>>("/habits", payload);
  return unwrapApiResponse(response.data).habit;
};

export const updateHabit = async (id: string, payload: UpdateHabitPayload) => {
  const response = await apiClient.patch<ApiResponse<HabitResponse>>(`/habits/${encodeURIComponent(id)}`, payload);
  return unwrapApiResponse(response.data).habit;
};

export const deleteHabit = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<null>>(`/habits/${encodeURIComponent(id)}`);
  unwrapApiResponse(response.data);
};

export const completeHabit = async (habitId: string, payload: CompleteHabitPayload) => {
  const response = await apiClient.post<ApiResponse<CompleteHabitResponse>>(
    `/habits/${encodeURIComponent(habitId)}/completions`,
    payload,
  );
  return unwrapApiResponse(response.data);
};

export const deleteCompletion = async (habitId: string, date: string) => {
  const response = await apiClient.delete<ApiResponse<DeleteCompletionResponse>>(
    `/habits/${encodeURIComponent(habitId)}/completions`,
    {
      params: { date },
    },
  );
  return unwrapApiResponse(response.data);
};

export const getHabitCompletions = async (habitId: string, from: string, to: string) => {
  const response = await apiClient.get<ApiResponse<HabitCompletionsResponse>>(
    `/habits/${encodeURIComponent(habitId)}/completions`,
    {
      params: rangeParams(from, to),
    },
  );
  return unwrapApiResponse(response.data).completions;
};

export const getHabitSummary = async (from: string, to: string) => {
  const response = await apiClient.get<ApiResponse<HabitSummaryResponse>>(`/habits/summary`, {
    params: rangeParams(from, to),
  });
  return unwrapApiResponse(response.data);
};

export const getHabitInsights = async (from: string, to: string) => {
  const response = await apiClient.get<ApiResponse<HabitInsightsResponse>>(`/habits/insights`, {
    params: rangeParams(from, to),
  });
  return unwrapApiResponse(response.data).insights;
};
