import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@moodmate/components/ui/toast";
import { Button } from "@moodmate/components/ui/button";
import { Card, CardContent } from "@moodmate/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@moodmate/components/ui/dialog";
import { useAllLogs, useDeleteLog } from "@moodmate/hooks/api/useLogs";
import { getMood } from "@moodmate/lib/moods";
import { format, isToday } from "date-fns";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getApiErrorMessage } from "@moodmate/lib/api";

const EmptyState = () => (
  <Card className="border-border bg-card">
    <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4">
        <CalendarDays className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <h3 className="font-medium text-lg mb-2">Belum ada entri</h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        Kamu belum pernah check-in. Lakukan check-in hari ini untuk melihat riwayat di sini.
      </p>
      <Link to="/dashboard/checkin" className="mt-6">
        <Button>
          Mulai check-in <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.75} />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
      </Button>
    </nav>
  );
};

const History = () => {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { data: logsData, isLoading, error } = useAllLogs(page, limit);
  const { mutate: deleteLog, isPending: deletePending } = useDeleteLog();

  const logs = logsData?.logs ?? [];
  const pagination = logsData?.pagination;

  const confirmDelete = (id: string) => {
    deleteLog(id, {
      onSuccess: () => {
        toast.success("Entri dihapus");
        setPendingDelete(null);
      },
      onError: (err: unknown) => {
        toast.error(getApiErrorMessage(err, "Gagal menghapus entri"));
      },
    });
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && pagination && newPage <= pagination.total_pages) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Riwayat jurnal</h1>
        <p className="text-muted-foreground mt-3 text-lg">Catatan hening hari-harimu.</p>
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
            <p className="text-destructive">Gagal memuat entri. Coba lagi.</p>
          </CardContent>
        </Card>
      ) : logs.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="border-l border-border pl-6 md:pl-8 space-y-6">
            {logs.map((e) => {
              const mood = getMood(e.mood_score);
              const Icon = mood.icon;
              const entryDate = new Date(e.created_at);
              const dateStr = format(entryDate, "MMM d");
              const isEditable = isToday(entryDate);

              return (
                <article key={e.id} className="relative">
                  <span className="absolute -left-[34px] md:-left-[42px] top-5 w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="border border-border bg-card rounded-md p-5 md:p-6">
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{dateStr}</p>
                      <div className="flex items-center gap-2 text-primary">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                        <span className="text-xs font-medium">{mood.label}</span>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed text-[15px]">{e.journal_text}</p>
                    {isEditable && (
                      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
                        <Link
                          to={`/dashboard/checkin?edit=${format(entryDate, "yyyy-MM-dd")}`}
                          className="inline-flex items-center justify-center h-8 px-3 text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Edit
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-muted-foreground hover:text-destructive"
                          onClick={() => setPendingDelete(e.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Hapus
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
          {pagination && (
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}

      <Dialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Hapus entri ini?</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
              Ini akan menghapus entri jurnalmu secara permanen. Tidak bisa dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" className="h-10 px-5" onClick={() => setPendingDelete(null)}>
              Batal
            </Button>
            <Button
              className="h-10 px-5 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => pendingDelete && confirmDelete(pendingDelete)}
              disabled={deletePending}
            >
              {deletePending ? "Menghapus..." : "Hapus"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
