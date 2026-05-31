import apiClient from './client';
import { ApiResponse } from '../types/api';

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
  const response = await apiClient.get<ApiResponse<WeeklyInsightsData>>('/insights/weekly');
  return response.data;
};
