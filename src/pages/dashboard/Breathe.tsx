import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";

const PHASES = [
  { label: "Tarik napas", duration: 4000 },
  { label: "Tahan", duration: 2000 },
  { label: "Hembuskan", duration: 6000 },
] as const;

const CALM_MUSIC_URL = "https://urbamgipmfpmasxxlani.supabase.co/storage/v1/object/public/assets/music/calm-ambient.mp3";

const Breathe = () => {
  const location = useLocation();
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset state when route changes or component unmounts
  useEffect(() => {
    return () => {
      setRunning(false);
      setPhaseIdx(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(CALM_MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (!running) return;

    const currentPhase = PHASES[phaseIdx];
    timeoutRef.current = setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % PHASES.length);
    }, currentPhase.duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phaseIdx, running]);

  useEffect(() => {
    if (audioRef.current) {
      if (running) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play failed:', err);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [running]);

  const phase = PHASES[phaseIdx];
  const scale = phase.label === "Tarik napas" ? 1 : phase.label === "Tahan" ? 1 : 0.55;

  const handleToggle = () => {
    setRunning((prev) => !prev);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Latihan pernapasan</h1>
        <p className="text-muted-foreground mt-3 text-lg">Ikuti lingkaran. Lentulkan bahu.</p>
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
        <Button
          variant="outline"
          onClick={handleToggle}
          className="h-11 px-6"
        >
          {running ? (
            <><Pause className="w-4 h-4 mr-2" strokeWidth={1.75} /> Jeda</>
          ) : (
            <><Play className="w-4 h-4 mr-2" strokeWidth={1.75} /> Mulai</>
          )}
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Volume2 className="w-4 h-4" />
          <span>Musik ambient tenang akan dimainkan saat latihan</span>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Empat detik tarik. Dua detik tahan. Enam detik hembuskan. Ulangi untuk satu menit.
        </p>
      </section>
    </div>
  );
};

export default Breathe;
