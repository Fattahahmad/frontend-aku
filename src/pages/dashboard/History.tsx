import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { moods } from "@/lib/moods";

type Entry = {
  id: string;
  date: string;
  moodId: number;
  text: string;
  tags?: string[];
  ai?: string;
};

const initialEntries: Entry[] = [
  { id: "1", date: "Sat, May 2", moodId: 4, text: "A long walk by the river — the kind that loosens your shoulders without you noticing.", tags: ["outdoors", "calm"], ai: "Movement and nature seem to lift you. Try to keep a weekly walk on the calendar." },
  { id: "2", date: "Fri, May 1", moodId: 5, text: "Finished the project draft. Felt the warm rush of finally letting go of something.", tags: ["work", "relief"], ai: "Completion gives you energy — notice what you want to start next." },
  { id: "3", date: "Thu, Apr 30", moodId: 3, text: "An ordinary day. Made tea, answered emails, watched the light move across the wall.", tags: ["routine"] },
  { id: "4", date: "Wed, Apr 29", moodId: 2, text: "Tired in a way that sleep doesn't seem to fix. Tried to be gentle with myself.", tags: ["tired"], ai: "Low energy days are valid. A short evening walk often helps reset sleep." },
  { id: "5", date: "Tue, Apr 28", moodId: 4, text: "Coffee with an old friend. We laughed about nothing in particular for an hour.", tags: ["friends"] },
  { id: "6", date: "Mon, Apr 27", moodId: 3, text: "A slow start. The week stretched ahead like a long quiet hallway.", tags: ["reflective"] },
];

const History = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(initialEntries);
  const [pendingDelete, setPendingDelete] = useState<Entry | null>(null);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setEntries((prev) => prev.filter((e) => e.id !== pendingDelete.id));
    toast.success("Entry deleted");
    setPendingDelete(null);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Journal history</h1>
        <p className="text-muted-foreground mt-3 text-lg">A quiet record of recent days.</p>
      </header>

      <section className="border-l border-border pl-6 md:pl-8 space-y-6">
        {entries.map((e) => {
          const mood = moods[e.moodId];
          const Icon = mood.icon;
          return (
            <article key={e.id} className="relative">
              <span className="absolute -left-[34px] md:-left-[42px] top-5 w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="border border-border bg-card rounded-md p-5 md:p-6">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{e.date}</p>
                  <div className="flex items-center gap-2 text-primary">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                    <span className="text-xs font-medium">{mood.label}</span>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed text-[15px]">{e.text}</p>
                {e.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {e.tags.map((t) => (
                      <span key={t} className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-md px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate(`/dashboard/checkin?edit=${e.id}`)}
                  >
                    <Pencil className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-muted-foreground hover:text-destructive"
                    onClick={() => setPendingDelete(e)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Delete
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
        {entries.length === 0 && (
          <p className="text-muted-foreground text-sm">No entries left. Start a new check-in.</p>
        )}
      </section>

      <Dialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Delete this entry?</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              This will permanently remove your journal entry from {pendingDelete?.date}. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" className="h-10 px-5" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button
              className="h-10 px-5 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
