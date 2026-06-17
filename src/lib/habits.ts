import { format, subDays } from "date-fns";

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

export interface HabitInsight {
  habitId: string;
  title: string;
  completedDays: number;
  streak: number;
  completionRate: number;
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

export const getToday = () => format(new Date(), "yyyy-MM-dd");

export const getLast7DaysRange = () => ({
  from: format(subDays(new Date(), 6), "yyyy-MM-dd"),
  to: getToday(),
});

export const getAffirmation = (streak: number) => {
  const affirmations = [
    "Keren kamu sudah berani memulai.",
    "Gas terus broo.",
    "Lanjutkan.",
    "Semangat.",
    "Ayo jangan menyerah.",
    "Bisa yuk bisa.",
    "Kamu luar biasa.",
  ];

  return affirmations[Math.min(Math.max(streak - 1, 0), affirmations.length - 1)];
};

export const getLast7DaysWithCounts = (summary?: HabitSummary) => {
  const range = getLast7DaysRange();
  const counts = new Map<string, number>();

  for (let index = 0; index < 7; index += 1) {
    counts.set(format(subDays(new Date(), 6 - index), "yyyy-MM-dd"), 0);
  }

  summary?.dailyCompletions.forEach((item) => {
    counts.set(item.date, item.count);
  });

  return Array.from({ length: 7 }, (_, index) => {
    const date = format(subDays(new Date(), 6 - index), "yyyy-MM-dd");
    return { date, count: counts.get(date) ?? 0 };
  });
};
