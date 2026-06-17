import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Target, Home, NotebookPen, BarChart3, Settings as SettingsIcon, BookOpen, Wind } from "lucide-react";
import { cn } from "@moodmate/lib/utils";
import { BrandMark } from "@moodmate/components/BrandMark";

const nav = [
  { to: "/dashboard/home", label: "Home", icon: Home },
  { to: "/dashboard/checkin", label: "Check-in", icon: NotebookPen },
  { to: "/dashboard/history", label: "History", icon: BookOpen },
  { to: "/dashboard/analytics", label: "Insights", icon: BarChart3 },
  { to: "/dashboard/breathe", label: "Breathe", icon: Wind },
  { to: "/dashboard/habits", label: "Habits", icon: Target },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    "/dashboard/home": "Home",
    "/dashboard/checkin": "Daily Check-in",
    "/dashboard/history": "Journal History",
    "/dashboard/analytics": "Weekly Insights",
    "/dashboard/breathe": "Breathe",
    "/dashboard/habits": "Habits",
    "/dashboard/settings": "Settings",
  };
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card p-8 sticky top-0 h-screen">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-lg mb-12">
          <BrandMark size="md" />
          AKU
        </NavLink>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition",
                  isActive
                    ? "bg-success/15 text-primary ring-1 ring-success"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <BrandMark size="sm" />
          AKU
          </NavLink>
          <span className="text-sm text-muted-foreground">{titleMap[pathname] || ""}</span>
        </header>
        <main className="flex-1 px-6 md:px-12 py-10 md:py-16 pb-28 md:pb-16 max-w-4xl w-full mx-auto">
          <Outlet />
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border grid grid-cols-7">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition",
                  isActive ? "text-success" : "text-muted-foreground"
                )
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
