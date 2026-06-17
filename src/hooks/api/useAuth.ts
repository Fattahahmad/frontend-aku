import { useMutation } from "@tanstack/react-query";
import { loginFn, registerFn, type LoginPayload, type RegisterPayload } from "@moodmate/api/auth.api";
import { setAccessToken } from "@moodmate/auth/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginFn(payload),
    onSuccess: (data) => {
      setAccessToken(data.token);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerFn(payload),
  });
};
