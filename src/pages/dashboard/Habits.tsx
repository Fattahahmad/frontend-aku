import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, Loader2, Target, Trash2, Trophy } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@moodmate/components/ui/button";
import { Card, CardContent } from "@moodmate/components/ui/card";
import { Input } from "@moodmate/components/ui/input";
import { Label } from "@moodmate/components/ui/label";
import { Textarea } from "@moodmate/components/ui/textarea";
import { toast } from "@moodmate/components/ui/toast";
import { cn } from "@moodmate/lib/utils";
import { getAffirmation, getLast7DaysRange, getLast7DaysWithCounts, type Habit, type HabitInsight } from "@moodmate/lib/habits";
import { getApiErrorMessage } from "@moodmate/lib/api";
import {
  useCompleteHabit,
  useCreateHabit,
  useDeleteCompletion,
  useDeleteHabit,
  useHabitInsights,
  useHabitSummary,
  useHabits,
} from "@moodmate/hooks/useHabits";

type Tab = "new" | "streak" | "insight";

const tabs: { id: Tab; label: string }[] = [
  { id: "new", label: "New Habit" },
  { id: "streak", label: "Streak" },
  { id: "insight", label: "Insight" },
];

const EmptyState = () => (
  <Card className="border-border bg-card">
    <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-md bg-accent text-primary flex items-center justify-center mb-4">
        <Target className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <h3 className="font-medium text-lg mb-2">Belum ada habit</h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        Mulai dengan satu kebiasaan kecil. Konsistensi kecil lebih berarti daripada target besar yang tidak terlacak.
      </p>
    </CardContent>
  </Card>
);

const Habits = () => {
  const [tab, setTab] = useState<Tab>("new");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const habitRange = getLast7DaysRange();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: summary, isLoading: summaryLoading } = useHabitSummary(habitRange.from, habitRange.to);
  const { data: habitInsights = [], isLoading: insightsLoading } = useHabitInsights(habitRange.from, habitRange.to);
  const { mutate: createHabit, isPending: createPending } = useCreateHabit();
  const { mutate: completeHabit, isPending: completePending } = useCompleteHabit();
  const { mutate: deleteCompletion, isPending: deleteCompletionPending } = useDeleteCompletion();
  const { mutate: deleteHabit } = useDeleteHabit();

  const chartData = getLast7DaysWithCounts(summary);
  const insightsByHabit = new Map<string, HabitInsight>(habitInsights.map((insight) => [insight.habitId, insight]));

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Tuliskan nama kebiasaan terlebih dahulu.");
      return;
    }

    createHabit(
      { title, description: description || null, targetDate: targetDate || null },
      {
        onSuccess: () => {
          toast.success("Habit berhasil dibuat.");
          setTitle("");
          setDescription("");
          setTargetDate("");
          setTab("streak");
        },
        onError: (error) => toast.error(getApiErrorMessage(error, "Habit gagal dibuat.")),
      },
    );
  };

  const handleDelete = (habit: Habit) => {
    deleteHabit(habit.id, {
      onSuccess: () => toast.success("Habit dihapus."),
      onError: (error) => toast.error(getApiErrorMessage(error, "Habit gagal dihapus.")),
    });
  };

  const handleComplete = (habitId: string) => {
    completeHabit(
      { habitId, payload: { date: today } },
      {
        onSuccess: (data) => toast.success(`Habit berhasil ditandai. Streak: ${data.streak} hari.`),
        onError: (error) => toast.error(getApiErrorMessage(error, "Habit gagal ditandai.")),
      },
    );
  };

  const handleDeleteCompletion = (habitId: string) => {
    deleteCompletion(
      { habitId, date: today },
      {
        onSuccess: () => toast.success("Completion hari ini dibatalkan."),
        onError: (error) => toast.error(getApiErrorMessage(error, "Completion gagal dibatalkan.")),
      },
    );
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Habit Tracker</h1>
        <p className="text-muted-foreground mt-3 text-lg">Bangun kebiasaan baru dan lihat progress konsistensimu.</p>
      </header>

      <section className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Button
            key={item.id}
            variant={tab === item.id ? "default" : "outline"}
            onClick={() => setTab(item.id)}
            className={cn(tab === item.id && "bg-primary text-primary-foreground")}
          >
            {item.label}
          </Button>
        ))}
      </section>

      {tab === "new" && (
        <Card className="border-border bg-card">
          <CardContent className="space-y-5 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-accent text-primary flex items-center justify-center">
                <Target className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">New Habit</h2>
                <p className="text-sm text-muted-foreground">Tulis kebiasaan yang ingin kamu bangun.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="habit-title">Kebiasaan yang ingin kubangun</Label>
              <Input
                id="habit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: olahraga ringan 15 menit"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="habit-description">Catatan tambahan</Label>
              <Textarea
                id="habit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan detail kecil agar habit lebih jelas."
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="habit-target">Target tanggal</Label>
              <Input
                id="habit-target"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreate} disabled={createPending}>
                {createPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {createPending ? "Menyimpan..." : "Simpan Habit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "streak" && (
        <>
          {habitsLoading || summaryLoading || insightsLoading ? (
            <Card className="border-border bg-card">
              <CardContent className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </CardContent>
            </Card>
          ) : habits.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4">
              {habits.map((habit) => {
                const insight = insightsByHabit.get(habit.id);
                const streak = insight?.streak ?? 0;
                const completedToday = streak > 0;
                const pending = completePending || deleteCompletionPending;

                return (
                  <Card key={habit.id} className="border-border bg-card">
                    <CardContent className="p-5 md:p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{habit.title}</h3>
                          {habit.description && (
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{habit.description}</p>
                          )}
                          {habit.target_date && (
                            <p className="text-xs text-muted-foreground mt-2">Target: {habit.target_date}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(habit)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-md border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Streak</p>
                          <p className="text-2xl font-semibold mt-1">{streak} hari</p>
                        </div>
                        <div className="rounded-md border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Selesai</p>
                          <p className="text-2xl font-semibold mt-1">{insight?.completedDays ?? 0} hari</p>
                        </div>
                        <div className="rounded-md border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Afirmasi</p>
                          <p className="text-sm leading-relaxed mt-2">{getAffirmation(streak)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={cn("w-4 h-4", completedToday && "text-success")} strokeWidth={1.5} />
                          <span>{completedToday ? "Sudah ditandai hari ini" : "Belum ditandai hari ini"}</span>
                        </div>
                        <Button
                          variant={completedToday ? "outline" : "default"}
                          onClick={() => (completedToday ? handleDeleteCompletion(habit.id) : handleComplete(habit.id))}
                          disabled={pending}
                        >
                          {pending ? "Menyimpan..." : completedToday ? "Batalkan" : "Streak hari ini"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {tab === "insight" && (
        <Card className="border-border bg-card">
          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-accent text-primary flex items-center justify-center">
                <Trophy className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Insight konsistensi</h2>
                <p className="text-sm text-muted-foreground">Progress habit dalam 7 hari terakhir.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-border bg-background">
                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Habit aktif</p>
                  <p className="text-2xl font-semibold mt-2">{summary?.activeHabits ?? habits.length}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background">
                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Total selesai</p>
                  <p className="text-2xl font-semibold mt-2">{summary?.totalCompleted ?? 0}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background">
                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Completion rate</p>
                  <p className="text-2xl font-semibold mt-2">{summary?.completionRate ?? 0}%</p>
                </CardContent>
              </Card>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Bar dataKey="count" fill="var(--success)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {summary?.bestStreak && (
              <div className="rounded-md border border-border bg-primary-soft p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Best streak</p>
                <p className="text-lg font-semibold mt-2">{summary.bestStreak.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{summary.bestStreak.streak} hari beruntun</p>
              </div>
            )}

            <div className="grid gap-3">
              {habitInsights.map((insight) => (
                <div key={insight.habitId} className="rounded-md border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {insight.completedDays} hari selesai · {insight.completionRate}% completion rate
                      </p>
                    </div>
                    <p className="text-sm font-medium text-primary">{insight.streak} streak</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Habits;
