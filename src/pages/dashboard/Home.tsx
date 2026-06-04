import { Link } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Calendar as CalendarIcon, SmilePlus, Flame, Sparkles, ArrowRight, Wind, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@moodmate/components/ui/dialog";
import { moods, getMood } from "@moodmate/lib/moods";
import { useSummary, useCalendar, useLogByDate } from "@moodmate/hooks/api/useLogs";
import { format } from "date-fns";
import { Card, CardContent } from "@moodmate/components/ui/card";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
};

type LoggedEntry = {
  moodId: number;
  text: string;
  tags: string[];
  ai?: string;
};

const Home = () => {
  const today = new Date();
  const [selectedEntry, setSelectedEntry] = useState<{ date: string; entry: LoggedEntry } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useSummary();
  const { data: calendarData, isLoading: calendarLoading } = useCalendar(today.getMonth() + 1, today.getFullYear());
  const { data: logDetail, isLoading: logDetailLoading } = useLogByDate(selectedDate || "");

  const loggedDays = useMemo(() => {
    const map = new Map<string, LoggedEntry>();
    const logs = calendarData?.data?.logs;
    if (Array.isArray(logs)) {
      logs.forEach((log) => {
        const date = new Date(log.log_date);
        const entry: LoggedEntry = {
          moodId: log.mood_score,
          text: "",
          tags: [],
          ai: "",
        };
        map.set(date.toDateString(), entry);
      });
    }
    return map;
  }, [calendarData]);

  const stats = [
    { icon: CalendarIcon, label: "Total check-in", value: summaryLoading ? "..." : summaryData?.data?.total_checkins?.toString() ?? "0" },
    { icon: SmilePlus, label: "Rata-rata mood", value: summaryLoading ? "..." : summaryData?.data?.average_mood_label ?? "Netral" },
    { icon: Flame, label: "Streak saat ini", value: summaryLoading ? "..." : `${summaryData?.data?.current_streak ?? 0} hari` },
  ];

  if (summaryError) {
    return (
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-destructive mt-3">Gagal memuat data dashboard.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm text-muted-foreground">{format(today, "EEEE, MMMM d")}</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
          {getGreeting()}, {summaryLoading ? "..." : summaryData?.data?.user_name ?? "teman"}.
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">Cuplikan hening minggu ini.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
        {stats.map((c, i) => (
          <div key={i} className="bg-card p-6">
            <c.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wide">{c.label}</p>
            <p className="text-2xl font-semibold mt-1 tracking-tight">{c.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-md border border-border bg-card overflow-hidden grid md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80"
          alt="Gunung di senja"
          className="w-full h-48 md:h-full object-cover"
          loading="lazy"
        />
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">Apa perasaanmu hari ini?</h2>
          <p className="text-muted-foreground mt-2">Sebuah jeda singkat. Cukup 30 detik.</p>
          <Link to="/dashboard/checkin" className="mt-6">
            <Button>
              Mulai check-in <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border border-border bg-card rounded-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Kalender mood</h2>
            <span className="text-xs text-muted-foreground">Tap hari untuk melihat entri</span>
          </div>
          {calendarLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : (
            <DayPicker
              mode="single"
              defaultMonth={today}
              showOutsideDays
              onDayClick={(date) => {
                const dateStr = format(date, "yyyy-MM-dd");
                setSelectedDate(dateStr);
              }}
              className="moodmate-calendar pointer-events-auto"
              modifiers={loggedDays.size > 0 ? { logged: Array.from(loggedDays.keys()).map(d => new Date(d)) } : {}}
              components={{
                DayContent: ({ date }) => {
                  const entry = loggedDays.get(date.toDateString());
                  // Adjust indexing: backend mood_score (1-5) to frontend moods array (0-4)
                  const Icon = entry ? moods.find(m => m.id === entry.moodId)?.icon : null;
                  return (
                    <div className="flex flex-col items-center justify-center leading-none gap-0.5">
                      <span>{date.getDate()}</span>
                      {Icon && <Icon className="w-3 h-3 text-primary" strokeWidth={1.75} />}
                    </div>
                  );
                },
              }}
            />
          )}
        </div>
        <Link
          to="/dashboard/breathe"
          className="border border-border bg-primary-soft rounded-md p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition"
        >
          <Wind className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-medium text-lg">Tarik napas</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Satu menit panduan pernapasan untuk menenangkan pikiran.
            </p>
            <span className="inline-flex items-center text-sm font-medium text-primary mt-5">
              Mulai <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} />
            </span>
          </div>
        </Link>
      </section>

      <section className="border-l-2 border-primary pl-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Insight terbaru
        </div>
        <p className="mt-3 text-foreground leading-relaxed">
          {summaryLoading ? "..." : summaryData?.data?.recent_insight ?? "Lakukan check-in pertama untuk melihat insight di sini."}
        </p>
      </section>

      <Dialog open={!!selectedDate && !!logDetail?.data?.log} onOpenChange={(o) => { if (!o) { setSelectedDate(null); setSelectedEntry(null); } }}>
        <DialogContent className="rounded-md">
          {logDetailLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : (
            <>
              <DialogHeader>
                {logDetail?.data?.log && (() => {
                  const mood = getMood(logDetail.data.log.mood_score);
                  const Icon = mood?.icon;
                  return Icon && (
                    <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  );
                })()}
                <DialogTitle className="text-2xl">
                  {logDetail?.data?.log && format(new Date(logDetail.data.log.created_at), "EEEE, MMMM d")}
                </DialogTitle>
                <DialogDescription className="text-sm uppercase tracking-wide text-primary pt-1">
                  {logDetail?.data?.log && getMood(logDetail.data.log.mood_score)?.label}
                </DialogDescription>
              </DialogHeader>
              {logDetail?.data?.log && (
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed text-[15px]">{logDetail.data.log.journal_text}</p>
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      const date = format(new Date(logDetail.data.log!.created_at), "yyyy-MM-dd");
                      setSelectedDate(null);
                      setSelectedEntry(null);
                    }}>
                      Tutup
                    </Button>
                    <Button size="sm" onClick={() => {
                      const date = format(new Date(logDetail.data.log!.created_at), "yyyy-MM-dd");
                      setSelectedDate(null);
                      setSelectedEntry(null);
                      window.location.href = `/dashboard/checkin?edit=${encodeURIComponent(date)}`;
                    }}>
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
