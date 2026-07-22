import apiClient from "./client";
import { unwrapApiResponse } from "@moodmate/lib/api";
import { ApiResponse } from "@moodmate/types/api";

export interface MoodTrendItem {
  day: string;
  date: string;
  emotion: string;
  intensity: number;
}

export interface FidAggregateItem {
  emotion: string;
  emotionId: string;
  frequency: number;
  avgIntensity: string;
  persistence: number;
}

export interface SummaryData {
  text: string;
  suggestion: string;
}

export interface WeeklyInsightsData {
  week_number?: string;
  week_range?: {
    from: string;
    to: string;
  };
  mood_trend: MoodTrendItem[];
  fid_aggregates?: FidAggregateItem[];
  summary: SummaryData;
  mood_state?: "Sangat Baik" | "Baik" | "Cukup" | "Perlu Perhatian" | "Sangat Perlu Perhatian" | string;
}

export const getWeeklyInsights = async () => {
  const response = await apiClient.get<ApiResponse<WeeklyInsightsData>>("/insights/weekly");
  return unwrapApiResponse(response.data);
};
