import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const PHASES = [
  { label: "Breathe in", duration: 4000 },
  { label: "Hold", duration: 2000 },
  { label: "Breathe out", duration: 6000 },
] as const;

const Breathe = () => {
  const [running, setRunning] = useState(true);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIdx].duration);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [phaseIdx, running]);

  const phase = PHASES[phaseIdx];
  const scale = phase.label === "Breathe in" ? 1 : phase.label === "Hold" ? 1 : 0.55;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Breathing exercise</h1>
        <p className="text-muted-foreground mt-3 text-lg">Follow the circle. Soften your shoulders.</p>
      </header>

      <section className="border border-border rounded-md bg-card p-10 md:p-16 flex flex-col items-center gap-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-soft" />
          <div
            className="absolute rounded-full bg-primary/20 border border-primary/30"
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${scale})`,
              transition: `transform ${phase.duration}ms ease-in-out`,
            }}
          />
          <span className="relative text-primary font-medium text-lg tracking-wide">
            {phase.label}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => setRunning((r) => !r)}
          className="h-11 px-6"
        >
          {running ? (
            <><Pause className="w-4 h-4 mr-2" strokeWidth={1.75} /> Pause</>
          ) : (
            <><Play className="w-4 h-4 mr-2" strokeWidth={1.75} /> Resume</>
          )}
        </Button>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Four seconds in. Two seconds hold. Six seconds out. Repeat for a minute.
        </p>
      </section>
    </div>
  );
};

export default Breathe;