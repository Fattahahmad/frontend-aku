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

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/Home"));
const CheckIn = lazy(() => import("./pages/dashboard/CheckIn"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const History = lazy(() => import("./pages/dashboard/History"));
const Breathe = lazy(() => import("./pages/dashboard/Breathe"));
const Habits = lazy(() => import("./pages/dashboard/Habits"));

const queryClient = new QueryClient();

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
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
