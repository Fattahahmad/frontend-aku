import { useMutation } from '@tanstack/react-query';
import { loginFn, registerFn, LoginPayload, RegisterPayload } from '@moodmate/api/auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginFn(payload),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerFn(payload),
  });
};
