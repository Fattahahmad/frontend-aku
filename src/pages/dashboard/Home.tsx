import { Link, useNavigate } from "react-router-dom";
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
import { moods, getMoodByEmotion } from "@moodmate/lib/moods";
import { useSummary, useCalendar, useLogByDate, useTodayLog } from "@moodmate/hooks/api/useLogs";
import { useHabitSummary } from "@moodmate/hooks/useHabits";
import { getLast7DaysRange } from "@moodmate/lib/habits";
import { format } from "date-fns";
import { toast } from "@moodmate/components/ui/toast";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
};

type LoggedEntry = {
  emotion: string;
  intensity: number;
};

const Home = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth() + 1);
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useSummary();
  const { data: todayLog, isLoading: todayLoading } = useTodayLog();
  const { data: calendarData, isLoading: calendarLoading } = useCalendar(calendarMonth, calendarYear);
  const { data: logDetail, isLoading: logDetailLoading } = useLogByDate(selectedDate || "");
  const habitRange = getLast7DaysRange();
  const { data: habitSummary } = useHabitSummary(habitRange.from, habitRange.to);

  const loggedDays = useMemo(() => {
    const map = new Map<string, LoggedEntry>();
    const logs = calendarData?.logs;

    if (Array.isArray(logs)) {
      logs.forEach((log) => {
        const date = new Date(log.log_date);
        map.set(date.toDateString(), {
          emotion: log.emotion,
          intensity: log.intensity,
        });
      });
    }

    return map;
  }, [calendarData]);

  const stats = [
    {
      icon: CalendarIcon,
      label: "Total Check-in",
      value: summaryLoading ? "..." : summaryData?.total_checkins?.toString() ?? "0",
    },
    {
      icon: SmilePlus,
      label: "Rata-rata Intensitas",
      value: summaryLoading ? "..." : summaryData?.average_intensity ? `${summaryData.average_intensity} / 10` : "0.0 / 10",
    },
    {
      icon: Flame,
      label: "Status Hari Ini",
      value: todayLoading ? "..." : todayLog?.has_checked_in ? "Sudah Check-In" : "Belum Check-In",
    },
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

  const handleDayClick = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const hasEntry = loggedDays.has(date.toDateString());
    setSelectedDate(dateStr);

    if (!hasEntry) {
      toast.info("Belum ada entri untuk tanggal ini.");
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm text-muted-foreground">{format(today, "EEEE, MMMM d, yyyy")}</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
          {getGreeting()}, {summaryLoading ? "..." : summaryData?.user_name ?? "Teman"}.
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">Ringkasan aktivitas dan kondisi emosionalmu hari ini.</p>
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

      <section className="border border-border bg-card rounded-md p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Habit Consistency</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {habitSummary?.activeHabits ?? 0} habit aktif · {habitSummary?.completionRate ?? 0}% completion rate ·{" "}
              {habitSummary?.bestStreak ? `${habitSummary.bestStreak.title} (${habitSummary.bestStreak.streak} hari)` : "mulai satu habit kecil"}
            </p>
          </div>
          <Link to="/dashboard/habits" className="text-sm font-medium text-primary">
            Kelola <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="rounded-md border border-border bg-card overflow-hidden grid md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
          alt="Nature landscape"
          className="w-full h-48 md:h-full object-cover"
          loading="lazy"
        />
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">Apa perasaanmu hari ini?</h2>
          <p className="text-muted-foreground mt-2">
            {todayLog?.has_checked_in
              ? "Kamu sudah melakukan check-in hari ini. Kamu bisa melihat atau mengedit entrinya."
              : "Jeda sejenak untuk mengenali dan mencatat emosi yang kamu rasakan hari ini."}
          </p>
          <Link to="/dashboard/checkin" className="mt-6">
            <Button>
              {todayLog?.has_checked_in ? "Lihat / Edit Check-in Hari Ini" : "Mulai Check-in Harian"}{" "}
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border border-border bg-card rounded-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Kalender Mood</h2>
            <span className="text-xs text-muted-foreground">Pilih hari untuk melihat entri</span>
          </div>
          {calendarLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : (
            <DayPicker
              mode="single"
              month={new Date(calendarYear, calendarMonth - 1)}
              onMonthChange={(newMonth) => {
                setCalendarMonth(newMonth.getMonth() + 1);
                setCalendarYear(newMonth.getFullYear());
              }}
              showOutsideDays
              onDayClick={handleDayClick}
              className="aku-calendar pointer-events-auto"
              modifiers={loggedDays.size > 0 ? { logged: Array.from(loggedDays.keys()).map((d) => new Date(d)) } : {}}
              components={{
                DayContent: ({ date }) => {
                  const entry = loggedDays.get(date.toDateString());
                  const mood = entry ? getMoodByEmotion(entry.emotion) : null;
                  const Icon = mood?.icon;

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
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> AI Insight Terbaru
        </div>
        <p className="mt-3 text-foreground leading-relaxed">
          {summaryLoading ? "..." : summaryData?.ai_insight ?? "Lakukan check-in harian secara konsisten untuk menerima analisis insight."}
        </p>
      </section>

      <Dialog open={Boolean(selectedDate)} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent className="rounded-md">
          {logDetailLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : logDetail ? (
            <>
              <DialogHeader>
                {(() => {
                  const mood = getMoodByEmotion(logDetail.emotion);
                  const Icon = mood?.icon;

                  return (
                    Icon && (
                      <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                    )
                  );
                })()}
                <DialogTitle className="text-2xl">
                  {format(new Date(logDetail.created_at), "EEEE, MMMM d, yyyy")}
                </DialogTitle>
                <DialogDescription className="text-sm uppercase tracking-wide text-primary pt-1">
                  {getMoodByEmotion(logDetail.emotion)?.labelIndonesian} (Intensitas: {logDetail.intensity}/10)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed text-[15px]">
                  {logDetail.journal_text || "Tidak ada catatan jurnal."}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)}>
                    Tutup
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      const date = format(new Date(logDetail.created_at), "yyyy-MM-dd");
                      setSelectedDate(null);
                      navigate(`/dashboard/checkin?edit=${encodeURIComponent(date)}`);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Belum ada entri pada tanggal ini.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
