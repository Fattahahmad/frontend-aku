import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { ambientSynth } from "@moodmate/lib/ambientSound";

const PHASES = [
  { label: "Tarik napas", duration: 4000 },
  { label: "Tahan", duration: 2000 },
  { label: "Hembuskan", duration: 6000 },
] as const;

const Breathe = () => {
  const location = useLocation();
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      setRunning(false);
      setPhaseIdx(0);
      ambientSynth.stop();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!running) return;

    const currentPhase = PHASES[phaseIdx];
    timeoutRef.current = setTimeout(() => {
      setPhaseIdx((current) => {
        const nextPhase = current + 1;
        if (nextPhase >= PHASES.length) {
          return 0;
        }
        return nextPhase;
      });
    }, currentPhase.duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phaseIdx, running]);

  useEffect(() => {
    if (running && !isMuted) {
      ambientSynth.start();
    } else {
      ambientSynth.stop();
    }
  }, [running, isMuted]);

  const phase = PHASES[phaseIdx];
  const scale = phase.label === "Tarik napas" ? 1 : phase.label === "Tahan" ? 1 : 0.55;

  const handleToggle = () => {
    setRunning((prev) => !prev);
  };

  const handleMuteToggle = () => {
    const nextMuted = ambientSynth.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Latihan pernapasan</h1>
        <p className="text-muted-foreground mt-3 text-lg">Ikuti lingkaran. Lenturkan bahu.</p>
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
            {running ? phase.label : "Siap"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleToggle}
            className="h-11 px-6 font-medium"
          >
            {running ? (
              <><Pause className="w-4 h-4 mr-2" strokeWidth={1.75} /> Jeda</>
            ) : (
              <><Play className="w-4 h-4 mr-2" strokeWidth={1.75} /> Mulai</>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            className="h-11 w-11 text-muted-foreground hover:text-foreground"
            title={isMuted ? "Aktifkan suara ambient" : "Matikan suara ambient"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-muted-foreground" strokeWidth={1.75} />
            ) : (
              <Volume2 className="w-5 h-5 text-primary" strokeWidth={1.75} />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Volume2 className="w-4 h-4 text-primary" />
          <span>
            {isMuted
              ? "Suara ambient dimatikan"
              : "Suara ambient hangat dimainkan saat latihan"}
          </span>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Empat detik tarik. Dua detik tahan. Enam detik hembuskan. Ulangi sesuai kebutuhan.
        </p>
      </section>
    </div>
  );
};

export default Breathe;
