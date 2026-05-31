import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSummary, getCalendar, getLogByDate, createLog, updateLog, deleteLog, getAllLogs, getSuggestion, CreateLogPayload } from '@moodmate/api/logs.api';

export const useSummary = () => {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => getSummary(),
  });
};

export const useCalendar = (month: number, year: number) => {
  return useQuery({
    queryKey: ['logs', 'calendar', month, year],
    queryFn: () => getCalendar(month, year),
  });
};

export const useLogByDate = (date: string) => {
  return useQuery({
    queryKey: ['logs', 'date', date],
    queryFn: () => getLogByDate(date),
    enabled: !!date,
  });
};

export const useCreateLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLogPayload) => createLog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    onError: (error: unknown) => {
      console.error('Create log error:', error);
    },
  });
};

export const useUpdateLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateLogPayload }) => updateLog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useDeleteLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const useAllLogs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['logs', 'all', page, limit],
    queryFn: () => getAllLogs(page, limit),
  });
};

export const useSuggestion = () => {
  return useMutation({
    mutationFn: ({ moodScore, journalText }: { moodScore: number; journalText: string }) => 
      getSuggestion(moodScore, journalText),
  });
};
