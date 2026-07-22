import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@moodmate/components/ui/button";
import { Textarea } from "@moodmate/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@moodmate/components/ui/dialog";
import { cn } from "@moodmate/lib/utils";
import { toast } from "@moodmate/components/ui/toast";
import { Sparkles, Loader2, Info } from "lucide-react";
import { moods, type PlutchikEmotion } from "@moodmate/lib/moods";
import { useCreateLog, useLogByDate, useTodayLog, useUpdateLog } from "@moodmate/hooks/api/useLogs";
import { getApiErrorMessage } from "@moodmate/lib/api";
import { checkInSchema, getFirstZodError } from "@moodmate/lib/validations";

const CheckIn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editDate = params.get("edit");

  const [selectedEmotion, setSelectedEmotion] = useState<PlutchikEmotion>("Joy");
  const [intensity, setIntensity] = useState<number>(7);
  const [journal, setJournal] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const { data: todayData, isLoading: todayLoading } = useTodayLog();
  const { mutate: createLog, isPending: createPending } = useCreateLog();
  const { mutate: updateLog, isPending: updatePending } = useUpdateLog();
  const { data: editLog, isLoading: editLoading, error: editError } = useLogByDate(editDate || "");

  const isPending = createPending || updatePending;

  // Sync data if editing specific date or today's existing log
  useEffect(() => {
    if (!initialized) {
      if (editDate && editLog) {
        const foundMood = moods.find((m) => m.emotion.toLowerCase() === editLog.emotion?.toLowerCase());
        if (foundMood) setSelectedEmotion(foundMood.emotion);
        setIntensity(editLog.intensity || 5);
        setJournal(editLog.journal_text || "");
        setInitialized(true);
      } else if (!editDate && todayData?.has_checked_in && todayData.log_data) {
        const todayLog = todayData.log_data;
        const foundMood = moods.find((m) => m.emotion.toLowerCase() === todayLog.emotion?.toLowerCase());
        if (foundMood) setSelectedEmotion(foundMood.emotion);
        setIntensity(todayLog.intensity || 5);
        setJournal(todayLog.journal_text || "");
        setInitialized(true);
      }
    }
  }, [editDate, editLog, todayData, initialized]);

  const save = () => {
    const payload = {
      emotion: selectedEmotion,
      intensity: Number(intensity),
      journal_text: journal,
    };

    const parsed = checkInSchema.safeParse(payload);

    if (!parsed.success) {
      toast.error(getFirstZodError(parsed.error));
      return;
    }

    const currentLogId = editLog?.id || todayData?.log_data?.id;

    if (editDate || todayData?.has_checked_in) {
      if (!currentLogId) {
        toast.error("Tidak dapat mengupdate: ID entri tidak ditemukan");
        return;
      }

      updateLog(
        { id: currentLogId, payload },
        {
          onSuccess: () => {
            toast.success("Check-in diperbarui!");
            setOpen(true);
          },
          onError: (err: unknown) => {
            toast.error(getApiErrorMessage(err, "Gagal mengupdate entri"));
          },
        }
      );
    } else {
      createLog(payload, {
        onSuccess: (res) => {
          toast.success("Jurnal harian berhasil disimpan!");
          setSuggestion(res.suggestion ?? null);
          setOpen(true);
        },
        onError: (err: unknown) => {
          toast.error(getApiErrorMessage(err, "Gagal menyimpan entri"));
        },
      });
    }
  };

  const closeAndGoHome = () => {
    setOpen(false);
    setJournal("");
    setSuggestion(null);
    navigate("/dashboard/home");
  };

  const getIntensityLabel = (val: number) => {
    if (val <= 3) return { text: "Lemah / Halus", color: "text-blue-500" };
    if (val <= 7) return { text: "Sedang / Terasa", color: "text-amber-500" };
    return { text: "Kuat / Sangat Intens", color: "text-emerald-500" };
  };

  const activeLogId = editLog?.id || todayData?.log_data?.id;

  if (editError) {
    return (
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Edit Entri</h1>
          <p className="text-muted-foreground mt-3 text-lg">Perbaiki entri emosi yang sudah ditulis.</p>
        </header>
        <p className="text-destructive">Gagal memuat entri. Mungkin sudah dihapus.</p>
        <Link to="/dashboard/history" className="text-sm underline">
          Kembali ke riwayat
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {activeLogId ? "Edit Check-in Hari Ini" : "Check-in Harian"}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          {activeLogId
            ? "Anda sudah melakukan check-in hari ini. Silakan perbarui emosi atau jurnal Anda."
            : "Jeda sejenak. Amati emosi yang paling dominan dirasakan saat ini."}
        </p>
      </header>

      {todayData?.has_checked_in && !editDate && (
        <div className="flex items-center gap-3 p-4 rounded-md border border-primary/20 bg-primary-soft/50 text-sm text-foreground">
          <Info className="w-5 h-5 text-primary shrink-0" strokeWidth={1.75} />
          <div>
            <span className="font-semibold">Sudah Check-In:</span> Anda memuat entri emosi hari ini. Mengklik tombol simpan akan mengupdate entri Anda.
          </div>
        </div>
      )}

      {editLoading || todayLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
        </div>
      ) : (
        <>
          {/* Section 1: 8 Plutchik Emotions */}
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                1. Pilih Emosi Utama (Roda Plutchik)
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Pilih salah satu dari 8 spektrum emosi dasar yang paling menggambarkan kondisi emosionalmu.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map((m) => {
                const isSelected = selectedEmotion === m.emotion;
                return (
                  <button
                    key={m.emotion}
                    type="button"
                    onClick={() => setSelectedEmotion(m.emotion)}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-md border text-left transition-all relative overflow-hidden",
                      isSelected
                        ? "border-primary bg-primary-soft text-primary shadow-sm ring-1 ring-primary"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <m.icon className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} strokeWidth={1.75} />
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                        {m.emotion}
                      </span>
                    </div>
                    <span className="text-sm font-semibold tracking-tight">{m.labelIndonesian}</span>
                    <span className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-snug font-normal">
                      {m.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2: Intensity Slider (1-10) */}
          <section className="space-y-4 rounded-md border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  2. Intensitas Emosi (Skala 1 – 10)
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Seberapa kuat rasa <span className="font-semibold text-foreground">{selectedEmotion}</span> ini dirasakan?
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary font-mono">{intensity}</span>
                <span className="text-xs text-muted-foreground"> / 10</span>
                <p className={cn("text-xs font-medium mt-0.5", getIntensityLabel(intensity).color)}>
                  {getIntensityLabel(intensity).text}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2.5 bg-accent rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono px-0.5">
                <span>1 (Sangat Halus)</span>
                <span>5 (Sedang)</span>
                <span>10 (Sangat Kuat)</span>
              </div>
            </div>
          </section>

          {/* Section 3: Journal Text */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              3. Jurnal Harian (Opsional / Catatan)
            </h2>
            <Textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Tuliskan peristiwa atau pikiran yang memicu emosi ini. Tidak ada yang membaca selain dirimu."
              className="min-h-[180px] resize-none text-base leading-relaxed bg-card"
            />
          </section>

          <Button onClick={save} className="h-12 px-10 font-semibold text-base" disabled={isPending}>
            {isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {isPending ? "Menyimpan..." : activeLogId ? "Simpan Perubahan Check-in" : "Simpan Check-in Hari Ini"}
          </Button>
        </>
      )}

      {/* Confirmation & Suggestion Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-md max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <DialogTitle className="text-2xl">Check-in Tersimpan</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              Jeda kecil ini sangat berharga. Mengakui emosi adalah langkah awal memahami diri.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 rounded-md border border-border bg-primary-soft/60 p-4 text-sm text-foreground leading-relaxed">
            <span className="font-semibold text-primary block mb-1">Saran dari AI / Sistem:</span>
            {suggestion ?? "Pertahankan energi ini! Luangkan waktu sejenak untuk refleksi diri di penghujung hari."}
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={closeAndGoHome} className="h-10 px-6" disabled={isPending}>
              Kembali ke Beranda
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckIn;
