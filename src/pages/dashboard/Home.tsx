import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, SmilePlus, Flame, Sparkles, ArrowRight, Wind } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { moods } from "@/lib/moods";

const stats = [
  { icon: CalendarIcon, label: "Total check-ins", value: "42" },
  { icon: SmilePlus, label: "Average mood", value: "Content" },
  { icon: Flame, label: "Current streak", value: "5 days" },
];

type LoggedEntry = {
  moodId: number;
  text: string;
  tags: string[];
  ai: string;
};

const loggedByOffset: Record<number, LoggedEntry> = {
  1: { moodId: 4, text: "Coffee with an old friend. We laughed about nothing in particular for an hour.", tags: ["friends", "calm"], ai: "Social warmth keeps showing up as a lift — protect time for it." },
  2: { moodId: 3, text: "An ordinary day. Made tea, answered emails, watched the light move across the wall.", tags: ["routine"], ai: "Ordinary days are the quiet baseline. Notice what made it gentle." },
  3: { moodId: 3, text: "A slow start. The week stretched ahead like a long quiet hallway.", tags: ["reflective"], ai: "Soft starts are okay — try a small intention to anchor the day." },
  4: { moodId: 2, text: "Tired in a way that sleep doesn't seem to fix. Tried to be gentle with myself.", tags: ["tired"], ai: "Low energy days are valid. A short evening walk often helps reset sleep." },
  5: { moodId: 4, text: "A long walk by the river — the kind that loosens your shoulders without you noticing.", tags: ["outdoors"], ai: "Movement near water seems restorative for you." },
  6: { moodId: 5, text: "Finished the project draft. Felt the warm rush of finally letting go of something.", tags: ["work", "relief"], ai: "Completion gives you energy — notice what you want to start next." },
};

const Home = () => {
  const today = new Date();
  const [selectedEntry, setSelectedEntry] = useState<{ date: Date; entry: LoggedEntry } | null>(null);

  const loggedDays = useMemo(() => {
    const map = new Map<string, LoggedEntry>();
    Object.entries(loggedByOffset).forEach(([off, entry]) => {
      const d = new Date(today);
      d.setDate(today.getDate() - Number(off));
      map.set(d.toDateString(), entry);
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMood = selectedEntry ? moods[selectedEntry.entry.moodId] : null;
  const SelectedIcon = selectedMood?.icon;

  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm text-muted-foreground">Sunday, May 3</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">Good morning, Alex.</h1>
        <p className="text-muted-foreground mt-3 text-lg">A quiet snapshot of your week.</p>
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
          alt="Mountain at dusk"
          className="w-full h-48 md:h-full object-cover"
          loading="lazy"
        />
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">How are you feeling today?</h2>
          <p className="text-muted-foreground mt-2">A short pause. Thirty seconds is enough.</p>
          <Link to="/dashboard/checkin" className="mt-6">
            <Button>
              Start check-in <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border border-border bg-card rounded-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Mood calendar</h2>
            <span className="text-xs text-muted-foreground">Tap a day to view its entry</span>
          </div>
          <DayPicker
            mode="single"
            defaultMonth={today}
            showOutsideDays
            onDayClick={(date) => {
              const entry = loggedDays.get(date.toDateString());
              if (entry) setSelectedEntry({ date, entry });
            }}
            className="moodmate-calendar pointer-events-auto"
            components={{
              DayContent: ({ date }) => {
                const entry = loggedDays.get(date.toDateString());
                const Icon = entry ? moods[entry.moodId].icon : null;
                return (
                  <div className="flex flex-col items-center justify-center leading-none gap-0.5">
                    <span>{date.getDate()}</span>
                    {Icon && <Icon className="w-3 h-3 text-primary" strokeWidth={1.75} />}
                  </div>
                );
              },
            }}
          />
        </div>
        <Link
          to="/dashboard/breathe"
          className="border border-border bg-primary-soft rounded-md p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition"
        >
          <Wind className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-medium text-lg">Take a breath</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              One minute of guided breathing to ease your mind.
            </p>
            <span className="inline-flex items-center text-sm font-medium text-primary mt-5">
              Begin <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} />
            </span>
          </div>
        </Link>
      </section>

      <section className="border-l-2 border-primary pl-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> Recent insight
        </div>
        <p className="mt-3 text-foreground leading-relaxed">
          Your mood has trended upward this week, with calm and contentment most prominent. Consider what felt restorative — and protect it.
        </p>
      </section>

      <Dialog open={!!selectedEntry} onOpenChange={(o) => !o && setSelectedEntry(null)}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            {selectedMood && SelectedIcon && (
              <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
                <SelectedIcon className="w-5 h-5" strokeWidth={1.75} />
              </div>
            )}
            <DialogTitle className="text-2xl">
              {selectedEntry?.date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
            </DialogTitle>
            <DialogDescription className="text-sm uppercase tracking-wide text-primary pt-1">
              {selectedMood?.label}
            </DialogDescription>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed text-[15px]">{selectedEntry.entry.text}</p>
              {selectedEntry.entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.entry.tags.map((t) => (
                    <span key={t} className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-md px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="rounded-md border border-border bg-primary-soft/60 p-4 text-sm text-foreground leading-relaxed flex gap-3">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>{selectedEntry.entry.ai}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
