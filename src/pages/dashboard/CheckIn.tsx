import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { moods } from "@/lib/moods";
import { useCreateLog, useLogByDate, useUpdateLog } from "@/hooks/api/useLogs";
import { isAxiosError } from "axios";

const CheckIn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editDate = params.get("edit");
  const [selected, setSelected] = useState<number | null>(3);
  const [journal, setJournal] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const { mutate: createLog, isPending: createPending } = useCreateLog();
  const { mutate: updateLog, isPending: updatePending } = useUpdateLog();
  const { data: editLogData, isLoading: editLoading, error: editError } = useLogByDate(editDate || "");

  const isPending = createPending || updatePending;

  useEffect(() => {
    if (editDate && editLogData?.data?.log) {
      setSelected(editLogData.data.log.mood_score);
      setJournal(editLogData.data.log.journal_text);
    }
  }, [editDate, editLogData]);

  const save = () => {
    if (selected === null) {
      toast.error("Pilih mood terlebih dahulu.");
      return;
    }
    
    const payload = {
      mood_score: selected ?? 0,
      journal_text: journal,
    };

    if (editDate) {
      const logId = editLogData?.data?.log?.id;
      if (!logId) {
        toast.error("Tidak dapat mengupdate: entri tidak ditemukan");
        return;
      }
      updateLog({ id: logId, payload }, {
        onSuccess: () => {
          toast.success("Entri diperbarui");
          setOpen(true);
        },
        onError: (err: unknown) => {
          let errorMsg = "Gagal mengupdate entri";
          if (isAxiosError(err) && err.response?.data?.message) {
            errorMsg = err.response.data.message;
          }
          console.error('Update log error:', err, errorMsg);
          toast.error(errorMsg);
        },
      });
    } else {
      createLog(payload, {
        onSuccess: (res) => {
          toast.success(res.message || "Entri disimpan");
          setSuggestion(res.data?.suggestion ?? null);
          setOpen(true);
        },
        onError: (err: unknown) => {
          let errorMsg = "Gagal menyimpan entri";
          if (isAxiosError(err) && err.response?.data?.message) {
            errorMsg = err.response.data.message;
          }
          console.error('Create log error:', err, errorMsg);
          toast.error(errorMsg);
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

  if (editError) {
    return (
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Edit entri</h1>
          <p className="text-muted-foreground mt-3 text-lg">Perbaiki yang sudah ditulis.</p>
        </header>
        <p className="text-destructive">Gagal memuat entri. Mungkin sudah dihapus.</p>
        <Link to="/dashboard/history" className="text-sm underline">Kembali ke riwayat</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {editDate ? "Edit entri" : "Check-in harian"}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          {editDate ? "Perbaiki yang sudah ditulis." : "Jeda kecil. Perhatikan apa yang ada."}
        </p>
      </header>

      {editLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-5">Apa perasaanmu?</h2>
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
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Jurnal</h2>
            <Textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Tulis dengan bebas. Tidak ada yang akan membaca selainmu."
              className="min-h-[220px] resize-none text-base leading-relaxed bg-card"
            />
          </section>

          <Button onClick={save} className="h-11 px-8 font-medium" disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isPending ? "Menyimpan..." : (editDate ? "Simpan perubahan" : "Simpan hari ini")}
          </Button>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <DialogTitle className="text-2xl">Entri disimpan</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              Tarik napas perlahan. Hembuskan dalam enam detik.
              Ketika dunia terasa berisik, kembali ke napasan adalah jalan pulang yang hening.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 rounded-md border border-border bg-primary-soft/60 p-4 text-sm text-foreground leading-relaxed">
            {suggestion ?? "Coba jalan kaki singkat sore ini — cukup sepuluh menit di luar rumah bisa menenangkan hari."}
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={closeAndGoHome} className="h-10 px-6" disabled={isPending}>
              Kembali ke beranda
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckIn;