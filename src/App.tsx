import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@moodmate/components/ui/sonner";
import { TooltipProvider } from "@moodmate/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@moodmate/auth/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { safeLazy } from "@moodmate/lib/safeLazy";

const Index = safeLazy(() => import("./pages/Index"));
const NotFound = safeLazy(() => import("./pages/NotFound"));
const Login = safeLazy(() => import("./pages/Login"));
const Register = safeLazy(() => import("./pages/Register"));
const DashboardLayout = safeLazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardHome = safeLazy(() => import("./pages/dashboard/Home"));
const CheckIn = safeLazy(() => import("./pages/dashboard/CheckIn"));
const Analytics = safeLazy(() => import("./pages/dashboard/Analytics"));
import ErrorBoundary from "./components/ErrorBoundary";

const Settings = safeLazy(() => import("./pages/dashboard/Settings"));
const History = safeLazy(() => import("./pages/dashboard/History"));
const Breathe = safeLazy(() => import("./pages/dashboard/Breathe"));
const Habits = safeLazy(() => import("./pages/dashboard/Habits"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      staleTime: 1000 * 60 * 2, // 2 menit
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div className="flex h-screen items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />
          <ErrorBoundary>
            <BrowserRouter>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />

                  <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="home" element={<DashboardHome />} />
                    <Route path="checkin" element={<CheckIn />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="history" element={<History />} />
                    <Route path="breathe" element={<Breathe />} />
                    <Route path="habits" element={<Habits />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
