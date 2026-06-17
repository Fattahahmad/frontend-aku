import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@moodmate/auth/useAuth";

export const PublicRoute = () => {
  const { isAuthenticated: isUserAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isUserAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};
