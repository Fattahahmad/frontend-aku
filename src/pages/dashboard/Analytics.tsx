import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Sparkles } from "lucide-react";

const trend = [
  { day: "Mon", mood: 3 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 2 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 5 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 5 },
];

const emotions = [
  { name: "Calm", value: 40 },
  { name: "Content", value: 30 },
  { name: "Anxious", value: 20 },
  { name: "Tired", value: 10 },
];

const Analytics = () => {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Weekly insights</h1>
        <p className="text-muted-foreground mt-3 text-lg">A quiet look at your past seven days.</p>
      </header>

      <section className="border border-border rounded-md bg-card p-6 md:p-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-6">Mood trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[1, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={1.75} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="border border-border rounded-md bg-card p-6 md:p-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-6">Emotion distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emotions} layout="vertical" margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={16}>
                {emotions.map((_, i) => <Cell key={i} fill="hsl(var(--primary))" fillOpacity={1 - i * 0.18} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="border-l-2 border-primary pl-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-3">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Summary
        </div>
        <p className="text-foreground leading-relaxed">
          A steady week with calm as your dominant state. A brief dip mid-week may relate to your Wednesday workload. Your overall trend points gently upward.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Suggestion — protect a short walk in the afternoon.
        </p>
      </section>
    </div>
  );
};

export default Analytics;
