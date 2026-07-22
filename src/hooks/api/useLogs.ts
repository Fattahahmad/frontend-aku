import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import {
  getSummary,
  getTodayLog,
  getCalendar,
  getLogByDate,
  createLog,
  updateLog,
  deleteLog,
  getAllLogs,
  getSuggestion,
  type CreateLogPayload,
  type LogDetail,
} from "@moodmate/api/logs.api";

const invalidateLogQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
  queryClient.invalidateQueries({ queryKey: ["logs"] });
};

export const useSummary = () => {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: () => getSummary(),
  });
};

export const useTodayLog = () => {
  return useQuery({
    queryKey: ["logs", "today"],
    queryFn: () => getTodayLog(),
  });
};

export const useCalendar = (month: number, year: number) => {
  return useQuery({
    queryKey: ["logs", "calendar", month, year],
    queryFn: () => getCalendar(month, year),
  });
};

export const useLogByDate = (date: string) => {
  return useQuery({
    queryKey: ["logs", "date", date],
    queryFn: () => getLogByDate(date),
    enabled: Boolean(date),
    select: (data) => data.log,
  });
};

export const useCreateLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLogPayload) => createLog(payload),
    onSuccess: () => {
      invalidateLogQueries(queryClient);
    },
  });
};

export const useUpdateLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateLogPayload }) => updateLog(id, payload),
    onSuccess: () => {
      invalidateLogQueries(queryClient);
    },
  });
};

export const useDeleteLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLog(id),
    onSuccess: () => {
      invalidateLogQueries(queryClient);
    },
  });
};

export const useAllLogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["logs", "all", page, limit],
    queryFn: () => getAllLogs(page, limit),
  });
};

export const useSuggestion = () => {
  return useMutation({
    mutationFn: ({ emotion, intensity, journalText }: { emotion: string; intensity: number; journalText: string }) =>
      getSuggestion(emotion, intensity, journalText),
  });
};

export type { LogDetail };
