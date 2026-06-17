import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, logoutUser } from "@moodmate/api/user.api";
import { clearAuth } from "@moodmate/auth/auth";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => getUserProfile(),
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateUserProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};
