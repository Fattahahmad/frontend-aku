import apiClient from "./client";
import { unwrapApiResponse } from "@moodmate/lib/api";
import { ApiResponse } from "@moodmate/types/api";

export interface MoodTrendItem {
  day: string;
  date: string;
  score: number;
}

export interface EmotionDistributionItem {
  emotion: string;
  count: number;
}

export interface SummaryData {
  text: string;
  suggestion: string;
}

export interface WeeklyInsightsData {
  mood_trend: MoodTrendItem[];
  emotion_distribution: EmotionDistributionItem[];
  summary: SummaryData;
}

export const getWeeklyInsights = async () => {
  const response = await apiClient.get<ApiResponse<WeeklyInsightsData>>("/insights/weekly");
  return unwrapApiResponse(response.data);
};
