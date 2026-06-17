import { useQuery } from "@tanstack/react-query";
import { getWeeklyInsights } from "@moodmate/api/analytics.api";

export const useWeeklyInsights = () => {
  return useQuery({
    queryKey: ["dashboard", "insights", "weekly"],
    queryFn: () => getWeeklyInsights(),
  });
};
