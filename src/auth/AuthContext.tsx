import { createContext } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
});
