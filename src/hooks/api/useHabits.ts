import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import {
  completeHabit,
  createHabit,
  deleteCompletion,
  deleteHabit,
  getHabits,
  getHabitInsights,
  getHabitSummary,
  updateHabit,
  type CompleteHabitPayload,
  type CompleteHabitResponse,
  type CreateHabitPayload,
  type Habit,
  type HabitInsight,
  type HabitSummary,
  type UpdateHabitPayload,
} from "@moodmate/api/habits.api";

const invalidateHabitQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["habits"] });
};

export const useHabits = () => {
  return useQuery({
    queryKey: ["habits", "list"],
    queryFn: () => getHabits(),
  });
};

export const useHabitSummary = (from: string, to: string) => {
  return useQuery<HabitSummary>({
    queryKey: ["habits", "summary", from, to],
    queryFn: () => getHabitSummary(from, to),
    enabled: Boolean(from && to),
  });
};

export const useHabitInsights = (from: string, to: string) => {
  return useQuery<HabitInsight[]>({
    queryKey: ["habits", "insights", from, to],
    queryFn: () => getHabitInsights(from, to),
    enabled: Boolean(from && to),
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<Habit, unknown, CreateHabitPayload>({
    mutationFn: createHabit,
    onSuccess: () => invalidateHabitQueries(queryClient),
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<Habit, unknown, { id: string; payload: UpdateHabitPayload }>({
    mutationFn: ({ id, payload }) => updateHabit(id, payload),
    onSuccess: () => invalidateHabitQueries(queryClient),
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: deleteHabit,
    onSuccess: () => invalidateHabitQueries(queryClient),
  });
};

export const useCompleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<CompleteHabitResponse, unknown, { habitId: string; payload: CompleteHabitPayload }>({
    mutationFn: ({ habitId, payload }) => completeHabit(habitId, payload),
    onSuccess: () => invalidateHabitQueries(queryClient),
  });
};

export const useDeleteCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation<{ streak: number }, unknown, { habitId: string; date: string }>({
    mutationFn: ({ habitId, date }) => deleteCompletion(habitId, date),
    onSuccess: () => invalidateHabitQueries(queryClient),
  });
};
