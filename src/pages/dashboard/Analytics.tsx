import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Sparkles, BarChart3, ArrowRight, ShieldAlert, HeartPulse } from "lucide-react";
import { useWeeklyInsights } from "@moodmate/hooks/api/useAnalytics";
import { Card, CardContent } from "@moodmate/components/ui/card";
import { Button } from "@moodmate/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@moodmate/lib/utils";

const Analytics = () => {
  const { data: insightsData, isLoading, error } = useWeeklyInsights();

  const moodTrend = insightsData?.mood_trend ?? [];
  const fidAggregates = insightsData?.fid_aggregates ?? [];
  const summary = insightsData?.summary;
  const moodState = insightsData?.mood_state;
  const hasData = moodTrend.length > 0 || fidAggregates.length > 0;

  const getMoodStateBadge = (state?: string) => {
    if (!state) return null;
    let bgClass = "bg-primary-soft text-primary border-primary/30";
    if (state.includes("Sangat Baik") || state.includes("Baik")) {
      bgClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    } else if (state.includes("Perhatian")) {
      bgClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
    }
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-tight", bgClass)}>
        <HeartPulse className="w-4 h-4" />
        Kategori Kesehatan Emosi: {state}
      </div>
    );
  };

  const EmptyState = () => (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4">
          <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h3 className="font-medium text-lg mb-2">Belum ada insight</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Kamu belum check-in minggu ini. Lakukan beberapa check-in harian untuk melihat tren emosi dan rekomendasi AI di sini.
        </p>
        <Link to="/dashboard/checkin" className="mt-6">
          <Button>
            Mulai Check-in <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Insight Mingguan</h1>
          <p className="text-muted-foreground mt-2 text-base sm:text-lg">Analisis spektrum emosi dan tren kesehatan mental minggu ini.</p>
        </div>
        {moodState && getMoodStateBadge(moodState)}
      </header>

      {isLoading ? (
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-destructive/30 bg-card">
          <CardContent className="flex items-center justify-center py-16">
            <p className="text-destructive flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Gagal memuat data insight. Pastikan koneksi backend aktif.
            </p>
          </CardContent>
        </Card>
      ) : !hasData ? (
        <EmptyState />
      ) : (
        <>
          {/* Mood Trend Chart */}
          {moodTrend.length > 0 && (
            <section className="border border-border rounded-md bg-card p-6 md:p-8 space-y-4">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Tren Intensitas Emosi</h2>
                <p className="text-xs text-muted-foreground mt-1">Grafik intensitas emosi harian (Skala 1 - 10)</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 6, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
                      formatter={(val: number, _name: string, props: { payload?: { emotion?: string } }) => [`${val} / 10 (${props.payload?.emotion || ""})`, "Intensitas"]}
                    />
                    <Line type="monotone" dataKey="intensity" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4, fill: "var(--primary)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* FID Aggregates / Distribution */}
          {fidAggregates.length > 0 && (
            <section className="border border-border rounded-md bg-card p-6 md:p-8 space-y-4">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Frekuensi & Rata-rata Intensitas Emosi</h2>
                <p className="text-xs text-muted-foreground mt-1">Agregasi emosi Plutchik yang paling sering dirasakan minggu ini.</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fidAggregates} layout="vertical" margin={{ left: 0, right: 8 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="emotion" type="category" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={90} />
                    <Tooltip
                      contentStyle={{ borderRadius: 6, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
                      formatter={(val: number) => [`${val} kali`, "Frekuensi"]}
                    />
                    <Bar dataKey="frequency" radius={[0, 4, 4, 0]} barSize={18}>
                      {fidAggregates.map((_, i) => (
                        <Cell key={i} fill="var(--primary)" fillOpacity={1 - i * 0.15} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}
        </>
      )}

      {summary && hasData && (
        <section className="border-l-2 border-primary pl-6 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.75} /> Ringkasan Analisis AI
          </div>
          <p className="text-foreground leading-relaxed text-base">{summary.text}</p>
          {summary.suggestion && (
            <p className="pt-2 text-sm text-muted-foreground font-medium">
              💡 Rekomendasi: <span className="font-normal">{summary.suggestion}</span>
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Analytics;
