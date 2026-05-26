import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState(true);
  const [dark, setDark] = useState(false);

  const toggleDark = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-3 text-lg">Make MoodMate yours.</p>
      </header>

      <section className="flex items-center gap-4 pb-8 border-b border-border">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">Alex Morgan</p>
          <p className="text-sm text-muted-foreground">alex@moodmate.app</p>
        </div>
      </section>

      <section className="divide-y divide-border border-b border-border">
        <div className="flex items-center justify-between py-5">
          <div>
            <Label htmlFor="reminders" className="font-medium">Daily reminders</Label>
            <p className="text-sm text-muted-foreground mt-1">A gentle nudge each evening.</p>
          </div>
          <Switch id="reminders" checked={reminders} onCheckedChange={setReminders} />
        </div>
        <div className="flex items-center justify-between py-5">
          <div>
            <Label htmlFor="dark" className="font-medium">Dark mode</Label>
            <p className="text-sm text-muted-foreground mt-1">Easier on the eyes at night.</p>
          </div>
          <Switch id="dark" checked={dark} onCheckedChange={toggleDark} />
        </div>
      </section>

      <Button
        variant="ghost"
        onClick={() => navigate("/login")}
        className="text-destructive hover:text-destructive hover:bg-destructive/5 font-medium"
      >
        <LogOut className="w-4 h-4 mr-2" strokeWidth={1.75} /> Log out
      </Button>
    </div>
  );
};

export default Settings;
