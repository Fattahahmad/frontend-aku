import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Sparkles, BarChart3, ArrowRight } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getWeeklyInsights } from '../../api/analytics.api';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Analytics = () => {
  const { data: insightsData, isLoading, error } = useQuery({
    queryKey: ['dashboard', 'insights', 'weekly'],
    queryFn: () => getWeeklyInsights(),
  });

  const moodTrend = insightsData?.data?.mood_trend ?? [];
  const emotionDistribution = insightsData?.data?.emotion_distribution ?? [];
  const summary = insightsData?.data?.summary;
  const hasData = moodTrend.length > 0 || emotionDistribution.length > 0;

  const EmptyState = () => (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4">
          <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h3 className="font-medium text-lg mb-2">Belum ada insight</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Kamu belum check-in. Lakukan beberapa check-in untuk melihat tren mood dan insight di sini.
        </p>
        <Link to="/dashboard/checkin" className="mt-6">
          <Button>
            Mulai check-in <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Insight mingguan</h1>
        <p className="text-muted-foreground mt-3 text-lg">Sejenak tenang melihat tujuh hari terakhir.</p>
      </header>

      {isLoading ? (
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-destructive bg-card">
          <CardContent className="flex items-center justify-center py-16">
            <p className="text-destructive">Gagal memuat insight. Coba lagi.</p>
          </CardContent>
        </Card>
      ) : !hasData ? (
        <EmptyState />
      ) : (
        <>
          <section className="border border-border rounded-md bg-card p-6 md:p-8">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-6">Tren mood</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[1, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={1.75} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="border border-border rounded-md bg-card p-6 md:p-8">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-6">Distribusi emosi</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionDistribution} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="emotion" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
                  <Bar dataKey="count" radius={[0, 2, 2, 0]} barSize={16}>
                    {emotionDistribution.map((_, i) => <Cell key={i} fill="hsl(var(--primary))" fillOpacity={1 - i * 0.18} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}

      {summary && hasData && (
        <>
          <section className="border-l-2 border-primary pl-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-3">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Ringkasan
            </div>
            <p className="text-foreground leading-relaxed">
              {summary.text}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Saran — {summary.suggestion}
            </p>
          </section>
        </>
      )}

      {!hasData && (
        <section className="border-l-2 border-primary pl-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-3">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Ringkasan
          </div>
          <p className="text-foreground leading-relaxed">
            Lakukan beberapa check-in untuk melihat insight mingguan.
          </p>
        </section>
      )}
    </div>
  );
};

export default Analytics;