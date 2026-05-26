import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { moods } from "@/lib/moods";

// Mock store of existing entries by id (mirrors History page)
const mockEntries: Record<string, { moodId: number; text: string }> = {
  "1": { moodId: 4, text: "A long walk by the river — the kind that loosens your shoulders without you noticing." },
  "2": { moodId: 5, text: "Finished the project draft. Felt the warm rush of finally letting go of something." },
  "3": { moodId: 3, text: "An ordinary day. Made tea, answered emails, watched the light move across the wall." },
  "4": { moodId: 2, text: "Tired in a way that sleep doesn't seem to fix. Tried to be gentle with myself." },
  "5": { moodId: 4, text: "Coffee with an old friend. We laughed about nothing in particular for an hour." },
  "6": { moodId: 3, text: "A slow start. The week stretched ahead like a long quiet hallway." },
};

const CheckIn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");
  const [selected, setSelected] = useState<number | null>(3);
  const [journal, setJournal] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editId && mockEntries[editId]) {
      setSelected(mockEntries[editId].moodId);
      setJournal(mockEntries[editId].text);
    }
  }, [editId]);

  const save = () => {
    if (selected === null) {
      toast.error("Please choose a mood first.");
      return;
    }
    toast.success(editId ? "Entry updated" : "Entry saved");
    setOpen(true);
  };

  const closeAndGoHome = () => {
    setOpen(false);
    setJournal("");
    navigate("/dashboard/home");
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {editId ? "Edit entry" : "Daily check-in"}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          {editId ? "Refine what you wrote earlier." : "A small pause. Notice what is here."}
        </p>
      </header>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-5">How are you feeling?</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "flex flex-col items-center gap-3 py-6 rounded-md border transition",
                selected === i
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              )}
            >
              <m.icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[11px] font-medium">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Journal</h2>
        <Textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Write freely. No one else will read this."
          className="min-h-[220px] resize-none text-base leading-relaxed bg-card"
        />
      </section>

      <Button onClick={save} className="h-11 px-8 font-medium">
        {editId ? "Save changes" : "Save my day"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <DialogTitle className="text-2xl">Entry saved</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              Take a slow, deep breath. Inhale for four, exhale for six.
              When the world feels loud, returning to your breath is a quiet way home.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 rounded-md border border-border bg-primary-soft/60 p-4 text-sm text-foreground leading-relaxed">
            Try a short walk this afternoon — even ten minutes outside often softens the day.
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={closeAndGoHome} className="h-10 px-6">Back to home</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckIn;
